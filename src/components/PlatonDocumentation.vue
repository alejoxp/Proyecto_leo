<script setup>
// Importamos 'ref' de Vue para datos reactivos.
// Esto permite que los cambios en los datos actualicen la vista automáticamente.
import { ref } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

// --- ZONA DE EDICIÓN DE DATOS ---
// Aquí defines las secciones de la documentación del servidor PLATON.
// Cada sección tiene título, descripción y código editable.
const sections = ref([
  // Sección 1: Servicios en PLATON
  {
    id: 1,
    title: 'Servicios en PLATON', // Título de la sección
    description: 'PLATON contiene los siguientes servicios:', // Descripción general
    code: `- DHCP - Servicio de direcciones IP. Entrega la IP correspondiente a los equipos de la red del segmento 172.17.2.0/24.
- JABBER - Servicio de Mensajería Instantánea.
- IPXE + WEB (APACHE/PHP) + TFTP - Servicio para permitir booteo por la red.
- Administración Web LDAP`, // Código o lista editable
    image: '' // Imagen opcional, aquí vacía
  },
  // Sección 2: Instalación de paquetes
  {
    id: 2,
    title: 'Instalación de Paquetes Necesarios',
    description: 'Ejecuta el siguiente comando para instalar los paquetes:',
    code: `aptitude install isc-dhcp-server apache2 php5 php5-ldap tftpd-hpa nfs-kernel-server ejabberd phpldapadmin`,
    image: ''
  },
  // Sección 3: Configurar Interfaz de Red
  {
    id: 3,
    title: 'Configurar la Interfaz de Red',
    description: 'Edita el archivo /etc/network/interfaces:',
    code: `auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
	address 172.17.2.3
	netmask 255.255.255.0
	gateway 172.17.2.1`,
    image: ''
  },
  // Sección 4: Configuración DHCP
  {
    id: 4,
    title: 'Configuración del Servidor DHCP',
    description: 'Configura /etc/default/isc-dhcp-server y /etc/dhcp/dhcpd.conf. Aquí va el contenido completo del dhcpd.conf:',
    code: `# Defaults for isc-dhcp-server initscript
# sourced by /etc/init.d/isc-dhcp-server
# installed at /etc/default/isc-dhcp-server by the maintainer scripts

#
# This is a POSIX shell fragment
#

# Path to dhcpd's config file (default: /etc/dhcp/dhcpd.conf).
#DHCPD_CONF=/etc/dhcp/dhcpd.conf

# Path to dhcpd's PID file (default: /var/run/dhcpd.pid).
#DHCPD_PID=/var/run/dhcpd.pid

# Additional options to start dhcpd with.
#	Don't use options -cf or -pf here; use DHCPD_CONF/ DHCPD_PID instead
#OPTIONS=""

# On what interfaces should the DHCP server (dhcpd) serve DHCP requests?
#	Separate multiple interfaces with spaces, e.g. "eth0 eth1".
INTERFACES="eth0".`,
    image: ''
  },
  // Sección 5: Configuración DHCP parte 2
  {
    id: 5,
    title: 'Configuración del Servidor DHCP',
    description: 'continua -> /etc/dhcp/dhcpd.conf ',
    code: `#
# Sample configuration file for ISC dhcpd for Debian
#
# $Id: dhcpd.conf,v 1.1.1.1 2002/05/21 00:07:44 peloy Exp $
#

# The ddns-updates-style parameter controls whether or not the server will
# attempt to do a DNS update when a lease is confirmed. We default to the
# behavior of the version 2 packages ('none', since DHCP v2 didn't
# have support for DDNS.)
ddns-update-style none;

# option definitions common to all supported networks...
#option domain-name "fundacite-sucre.gob.ve";
#option domain-name-servers 172.17.2.132, 172.17.2.230;

#default-lease-time 600;
#max-lease-time 7200;

# If this DHCP server is the official DHCP server for the local
# network, the authoritative directive should be uncommented.
authoritative;

# Use this to send dhcp log messages to a different log file (you also
# have to hack syslog.conf to complete the redirection).
log-facility local7;

# No service will be given on this subnet, but declaring it helps the 
# DHCP server to understand the network topology.

#subnet 10.152.187.0 netmask 255.255.255.0 {
#}

# This is a very basic subnet declaration.

#subnet 10.254.239.0 netmask 255.255.255.224 {
#  range 10.254.239.10 10.254.239.20;
#  option routers rtr-239-0-1.example.org, rtr-239-0-2.example.org;
#}

# This declaration allows BOOTP clients to get dynamic addresses,
# which we don't really recommend.

#subnet 10.254.239.32 netmask 255.255.255.224 {
#  range dynamic-bootp 10.254.239.40 10.254.239.60;
#  option broadcast-address 10.254.239.31;
#  option routers rtr-239-32-1.example.org;
#}

# A slightly different configuration for an internal subnet.

######################
## FUNDACITE SUCRE ##
#####################
subnet 172.17.2.0 netmask 255.255.255.0 {
  range 172.17.2.2 172.17.2.235;
  option domain-name-servers 172.17.2.4, 172.17.2.20;
  option domain-name "fundacite-sucre.gob.ve";
  option routers 172.17.2.1;
  option broadcast-address 172.17.2.255;
  deny unknown-clients;
  default-lease-time 600;
  max-lease-time 7200;

  if exists user-class and ( option user-class = "iPXE" ) {
    filename "http://172.17.2.3/boot.php";
  }
  else {
    filename "ipxe.pxe";
  }

}

# Hosts which require special configuration options can be listed in
# host statements.   If no address is specified, the address will be
# allocated dynamically (if possible), but the host-specific information
# will still come from the host declaration.

#host passacaglia {
#  hardware ethernet 0:0:c0:5d:bd:95;
#  filename "vmunix.passacaglia";
#  server-name "toccata.fugue.com";
#}

# Fixed IP addresses can also be specified for hosts.   These addresses
# should not also be listed as being available for dynamic assignment.
# Hosts for which fixed IP addresses have been specified can boot using
# BOOTP or DHCP.   Hosts for which no fixed address is specified can only
# be booted with DHCP, unless there is an address range on the subnet
# to which a BOOTP client is connected which has the dynamic-bootp flag
# set.


############################
#### FUNDACITE SUCRE #######
############################

##### SERVIDORES #####

host platon {
  hardware ethernet 00:19:21:1a:ff:0e;
  fixed-address 172.17.2.3;
}

host newton {
  hardware ethernet 00:1c:c0:90:c9:77;
  fixed-address 172.17.2.4;
}

host pittier {
  hardware ethernet 00:10:4B:21:8E:3D;
  fixed-address 172.17.2.7;
}

host lamarck {
  hardware ethernet 00:13:20:8a:93:4f;
  fixed-address 172.17.2.5;
}

host copernico {
  hardware ethernet 00:1C:C0:E5:31:DC;
  fixed-address 172.17.2.9;
}

host darwin {
  hardware ethernet 00:1c:c0:58:3d:66;
  fixed-address 172.17.2.6;
}

host einstein {
  hardware ethernet 00:19:d1:98:d7:02;
  fixed-address 172.17.2.8;
}

host galileo {
  hardware ethernet 00:1c:c0:90:ad:d0;
  fixed-address 172.17.2.10;
}

host socrates {
  hardware ethernet 00:48:54:d0:f6:41;
  fixed-address 172.17.2.11;
}

host aristoteles {
  hardware ethernet 00:19:d1:98:d7:33;
  fixed-address 172.17.2.12;
}

#host pascal {
#  hardware ethernet 00:13:20:26:c3:be;
#  fixed-address 172.17.2.13;
#}

host nsocrates {
  hardware ethernet 00:18:51:50:9d:d7;
  option domain-name-servers 172.17.2.20, 172.17.2.4;
  fixed-address 172.17.2.20;
}

host lsocrates {
  hardware ethernet 00:18:51:be:c1:8b;
  fixed-address 172.17.2.21;
}

host psocrates {
  hardware ethernet 00:18:51:a7:62:ba;
  fixed-address 172.17.2.22;
}

host siga {
  hardware ethernet 00:10:4b:21:8e:3d;
  fixed-address 172.17.2.15;
}

##### IMPRESORAS #####

host laser_coordapy {
  hardware ethernet 00:30:C1:CE:4A:D9;
  fixed-address 172.17.2.31;
}

host laser_coordtit {
  hardware ethernet 00:1A:4B:18:3B:46;
  fixed-address 172.17.2.32;
}

host tinta_coordtit {
  hardware ethernet 00:1C:C4:75:D6:1E;
  fixed-address 172.17.2.33;
}

host laser_coordpde {
  hardware ethernet 00:17:A4:97:9F:CB;
  fixed-address 172.17.2.34;
}

host tinta_reproduccion {
  hardware ethernet 00:19:5B:EB:19:B0;
  fixed-address 172.17.2.35;
}


host laser_coorddysc {
  hardware ethernet 00:17:A4:97:BE:59;
  fixed-address 172.17.2.14;
}

host lasercolor_coordpde {
  hardware ethernet 00:11:0A:C5:6C:24;
  fixed-address 172.17.2.37;
}

host laser_cdsl {
  hardware ethernet 00:14:38:E6:89:66;
  fixed-address 172.17.2.38;
}

host laser_direj {
  hardware ethernet 00:1A:4B:13:B7:06;
  fixed-address 172.17.2.39;
}

host tinta_pres {
  hardware ethernet 00:17:A4:6B:9D:EF;
  fixed-address 172.17.2.40;
}

##### ESTACIONES ######

###COORD TECNOLOGIA E INNOVACION TECNOLOGICA

host guiria {
  hardware ethernet 00:1C:C0:02:07:BE;
  fixed-address 172.17.2.51;
}

host omega {
  hardware ethernet 00:19:D1:8D:0D:C2;
  fixed-address 172.17.2.102;
}

host tecnologia {
#  hardware ethernet 00:15:58:97:FA:F9;
  hardware ethernet 00:19:d1:1e:3e:c6;
#  fixed-address 172.17.2.53;
  fixed-address 172.17.2.208;
}

host CLONATOR {
  hardware ethernet 00:11:11:d4:2e:52;
  fixed-address 172.17.2.54;
}

host desarrollo {
#  hardware ethernet 00:19:d1:98:d6:cd;
#  hardware ethernet 00:1c:c0:52:d7:b4;
  hardware ethernet 70:71:bc:0c:a4:b1;
  fixed-address 172.17.2.103;
}

host soporte {
 hardware ethernet 00:1c:c0:4e:d4:ee;
 fixed-address 172.17.2.101;
}

host byte {
  hardware ethernet 00:19:d1:98:d7:d3;
#  fixed-address 172.17.2.100;
  fixed-address 172.17.2.200;
}

host pasante {
  hardware ethernet 00:19:D1:15:4E:57;
  fixed-address 172.17.2.83;
}


###COORD DIVULGACION Y SOCIALIZACION DE LA CIENCIA

host beta {
  hardware ethernet 00:1c:c0:52:d7:79;
  fixed-address 172.17.2.56;
}

host castellano {
  hardware ethernet 00:11:11:76:0c:f7;
  fixed-address 172.17.2.57;
}

host morocoto {
  hardware ethernet 00:19:d1:78:7b:30;
  fixed-address 172.17.2.207;
}

host mochima {
  hardware ethernet 00:1c:c0:52:d7:88;
  fixed-address 172.17.2.60;
}

host prensa {
 hardware ethernet 00:1c:c0:02:08:f1;
 fixed-address 172.17.2.62;
}

###COORD PLANIFICACION Y APOYO ADMINISTRATIVO

host bienes {
  hardware ethernet 00:11:11:2a:9f:9f;
  fixed-address 172.17.2.63;
}

host nomina {
  hardware ethernet 00:11:11:a0:a7:6f;
  fixed-address 172.17.2.64;
}

host admin {
  hardware ethernet 00:16:76:0A:91:51;
#  fixed-address 172.17.2.65;
  fixed-address 172.17.2.201;
}

host contabilidad {
  #hardware ethernet 00:60:08:57:2d:6c;
  hardware ethernet 00:19:d1:1e:3d:33;
  fixed-address 172.17.2.66;
}

host nominad {
  hardware ethernet 00:11:11:13:69:30;
  fixed-address 172.17.2.67;
}

host inventario {
  hardware ethernet 00:19:D1:8D:0D:DF;
  fixed-address 172.17.2.68;
}

host redes {
 hardware ethernet 00:11:11:13:cc:4a;
  fixed-address 172.17.2.69;
}

host planificacion {
  hardware ethernet 00:1c:c0:90:ad:ec;
#  fixed-address 172.17.2.70;
  fixed-address 172.17.2.205;
}

host sumatoria {
  hardware ethernet 00:19:D1:1D:D2:52;
  fixed-address 172.17.2.88;
}

###COORD PROGRAMAS PARA EL DESARROLLO ENDOGENO

host misionciencia {
  hardware ethernet 00:13:20:C5:8A:99;
  fixed-address 172.17.2.71;
}

host marx {
  hardware ethernet 00:11:11:d4:2e:62;
  fixed-address 172.17.2.72;
}

host rips {
  hardware ethernet 00:19:D1:98:D6:D9;
  fixed-address 172.17.2.73;
}

host sigma {
  hardware ethernet 00:19:D1:78:7A:F3;
  fixed-address 172.17.2.74;
}

host cachama {
  hardware ethernet 00:1C:C0:02:08:17;
#  fixed-address 172.17.2.75;
  fixed-address 172.17.2.204;
}

host pavon {
  hardware ethernet 00:1C:C0:02:08:E4;
  fixed-address 172.17.2.76;
}

host gamma {
  hardware ethernet 00:19:D1:78:79:C3;
  fixed-address 172.17.2.77;
}

host alfa {
  hardware ethernet 00:16:76:33:9B:E5;
#  fixed-address 172.17.2.78;
  fixed-address 172.17.2.203;
}

host asistente {
  hardware ethernet 00:19:D1:15:6C:A0;
  fixed-address 172.17.2.82;
}

### PRESIDENCIA Y DIRECCION EJECUTIVA

host presidencia {
  hardware ethernet 00:13:20:26:c3:be;
#  fixed-address 172.17.2.79;
  fixed-address 172.17.2.202;
}

host secpresidencia {
  hardware ethernet 00:19:d1:1d:d1:d5;
  fixed-address 172.17.2.80;
}

host consultoria {
  hardware ethernet 00:1c:c0:50:29:8A;
  fixed-address 172.17.2.81;
}

host secinformatica {
  hardware ethernet 00:06:4F:10:B9:7A;
  fixed-address 172.17.2.93;
}

host informaticapasante1{
  hardware ethernet 00:19:d1:1d:d2:6b;
  fixed-address 172.17.2.94;
}

### LAPTOPS

host laptophp1 {
  hardware ethernet 00:16:D3:AA:51:23;
  fixed-address 172.17.2.84;
}

host laptophp2 {
  hardware ethernet 00:17:a4:e2:e2:00;
  fixed-address 172.17.2.85;
}

host laptoptoshiba1 {
  hardware ethernet 00:a0:d1:6d:8e:08;
  fixed-address 172.17.2.89;
}

host laptoptoshiba2 {
  hardware ethernet 00:15:b7:59:b9:5d;
  fixed-address 172.17.2.90;
}


host laptopadmon {
  hardware ethernet 00:a0:d1:26:91:35;
  fixed-address 172.17.2.91;
}

host laptophp3 {
  hardware ethernet 00:0d:9d:46:92:61;
  fixed-address 172.17.2.92;
}

host laptopvit1{
#  hardware ethernet 54:be:f7:43:ab:db;
  hardware ethernet 54:be:f7:10:1d:98;
  fixed-address 172.17.2.206;
}

host biblioteca1 {
  hardware ethernet 00:19:d1:1e:3d:49;
  fixed-address 172.17.2.95;
}

host biblioteca2 {
  hardware ethernet 00:19:d1:1d:d1:e3;
  fixed-address 172.17.2.96;
}

host opsu1 {
  hardware ethernet 00:15:60:5c:d3:b1;
  fixed-address 172.17.2.97;
}

### EXTRAS


# You can declare a class of clients and then do address allocation
# based on that.   The example below shows a case where all clients
# in a certain class get addresses on the 10.17.224/24 subnet, and all
# other clients get addresses on the 10.0.29/24 subnet.

#class "foo" {
#  match if substring (option vendor-class-identifier, 0, 4) = "SUNW";
#}

#shared-network 224-29 {
#  subnet 10.17.224.0 netmask 255.255.255.0 {
#    option routers rtr-224.example.org;
#  }
#  subnet 10.0.29.0 netmask 255.255.255.0 {
#    option routers rtr-29.example.org;
#  }
#  pool {
#    allow members of "foo";
#    range 10.17.224.10 10.17.224.250;
#  }
#  pool {
#    deny members of "foo";
#    range 10.0.29.10 10.0.29.230;
#  }
#}


host pruebas_ldap {
  hardware ethernet 00:16:76:33:90:e4;
  fixed-address 172.17.2.195;
}

host router_biblioteca_roche{
  hardware ethernet 08:5B:0E:00:A0:18;
  fixed-address 172.17.2.250;  
}`,
    image: '' 
  },
  // Sección 6: Configuración Booteo por Red
  
 
  {
    id: 6,
    title: 'Configuración del booteo por red:',
    description: 'Verificar la configuracion del archivo /etc/default/tftpd-hda, alli se va alojar el archivo ipxe.pxe necesario para bootear por la red.',
    code: `# /etc/default/tftpd-hpa

TFTP_USERNAME="tftp"
TFTP_DIRECTORY="/srv/tftp"
TFTP_ADDRESS="0.0.0.0:69"
TFTP_OPTIONS="--secure"`,
    image: '' 
  },
   
   {
    id: 7,
    title: 'Descargar de internet el archivo ipxe.pxe y copiar en la carpeta /svr/tftp/ ',
    description: '',
    code: `root@platon:~# cp /mnt/ipxe.pxe /srv/tftp/
root@platon:~# ls /srv/tftp/
ipxe.pxe
root@platon:~#`,
    image: ''
  },
  // Sección 6: Configuración Booteo por Red
  {
    id: 8,
    title: 'Crear el archivo /var/www/html/boot.php ',
    description: '',
    code: `'<?php
header("Content-Type: text/plain; charset=uft-8");
print "#!ipxe\n";
print "set server_ip ".$_SERVER[\'SERVER_ADDR\']."\n";

//si existen los parametros \'usuario y \'clave\', verificar si son usuarios validos. Por el contrario, mostrar la pantalla de login
if(isset($_GET[\'usuario\']) and isset($_GET[\'clave\'])):
  $valido=false;
  //validar usuario
  if($_GET[\'usuario\']==\'admin\' and $_GET[\'clave\']==\'123456\')
     $valido=true;
  //fin validar usuario

  //si el usuario es invalido, volver a cargar la pagina para que haga login.
  if(!$valido):
    print  "chain http://\${server_ip}/boot.php\n";
    exit;
  endif;
else:
  print "login\n";
  print "chain http://\${server_ip}/boot.php?usuario=\ $ {username}&clave=\ $ {password}\n";
  exit;
endif;
?>

:MENU
menu
item --gap -- ----MENU PRINCIPAL----
item hddreg 	HDD Regenerator
item drbl 	DRBL Live
item drbl_ram 	DRBL Live (cargar en ram)
choose --default drbl --timeout 5000 target && goto $ {target}


:hddreg
initrd http://$ {server_ip}/netboot/hddreg.img
chain /netboot/memdisk

:drbl
initrd http://$ {server_ip}/netboot/drbl/live/initrd.img
kernel /netboot/drbl/live/vmlinuz ip=dhcp boot=live username=user config noswap nolocales edd=on nomoeset vga=788 nosplash noprompt root=/dev/nfs nfsroot=\${server_ip}:/var/www/html/netboot/drbl/
boot

:drbl_ram
initrd http://$ {server_ip}/netboot/drbl/live/initrd.img
kernel /netboot/drbl/live/vmlinuz ip=dhcp boot=live username=user config noswap nolocales edd=on nomoeset vga=788 nosplash noprompt fetch=http://\${server_ip}/netboot/drbl/live/filesystem.squashfs
boot

autoboot'`,
    image: ''
  },
  // Sección 7: Crear carpeta para imágenes de booteo
  {
    id: 9,
    title: 'Crear la carpeta /var/www/html/netboot/, carpeta donde se colocaran las images/sistemas a arrancar: ',
    description: '',
    code: `/var/www/html/netboot/memdisk
/var/www/html/netboot/hddreg.img
/var/www/html/netboot/drbl/live/initrd.img
/var/www/html/netboot/drbl/live/vmlinuz
/var/www/html/netboot/drbl/live/filesystem.squashfs`,
    image: ''
  },
  // Sección 8: ejabberd2 (posiblemente configuración adicional o segunda parte)
  {
    id: 10,
    title: 'Editar el archivo /etc/exports para compartir la carpeta donde se encuentran las imagenes y/o sistemas a bootear. ',
    description: '',
    code: `# /etc/exports: the access control list for filesystems which may be exported
#		to NFS clients.  See exports(5).
#
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
#

/var/www/html/netboot/	*(ro,sync,no_subtree_check)`,
    image: '' 
  },
  
  {
    id: 11,
    title: 'Configuración ejabberd2',
    description: 'Editar el archivo /etc/ejabberd/ejabberd.yml ',
    code: `###
###               ejabberd configuration file
###
###

### The parameters used in this configuration file are explained in more detail
### in the ejabberd Installation and Operation Guide.
### Please consult the Guide in case of doubts, it is included with
### your copy of ejabberd, and is also available online at
### http://www.process-one.net/en/ejabberd/docs/

### The configuration file is written in YAML.
### Refer to http://en.wikipedia.org/wiki/YAML for the brief description.
### However, ejabberd treats different literals as different types:
###
### - unquoted or single-quoted strings. They are called "atoms".
###   Example: dog, 'Jupiter', '3.14159', YELLOW
###
### - numeric literals. Example: 3, -45.0, .0
###
### - quoted or folded strings.
###   Examples of quoted string: "Lizzard", "orange".
###   Example of folded string:
###   > Art thou not Romeo,
###     and a Montague?

###   =======
###   LOGGING

##
## loglevel: Verbosity of log files generated by ejabberd.
## 0: No ejabberd log at all (not recommended)
## 1: Critical
## 2: Error
## 3: Warning
## 4: Info
## 5: Debug
##
loglevel: 4

##
## rotation: Disable ejabberd's internal log rotation, as the Debian package
## uses logrotate(8).
log_rotate_size: 0
log_rotate_date: ""

##
## overload protection: If you want to limit the number of messages per second
## allowed from error_logger, which is a good idea if you want to avoid a flood
## of messages when system is overloaded, you can set a limit.
## 100 is ejabberd's default.
log_rate_limit: 100

##
## watchdog_admins: Only useful for developers: if an ejabberd process
## consumes a lot of memory, send live notifications to these XMPP
## accounts.
##
## watchdog_admins:
##   - "bob@example.com"


###   ================
###   SERVED HOSTNAMES

##
## hosts: Domains served by ejabberd.
## You can define one or several, for example:
## hosts: 
##   - "example.net"
##   - "example.com"
##   - "example.org"
##
hosts:
  - "fundacite-sucre.gob.ve"

##
## route_subdomains: Delegate subdomains to other XMPP servers.
## For example, if this ejabberd serves example.org and you want
## to allow communication with an XMPP server called im.example.org.
##
## route_subdomains: s2s

###   ===============
###   LISTENING PORTS

##
## listen: The ports ejabberd will listen on, which service each is handled
## by and what options to start it with.
##
listen: 
  - 
    port: 5222
    ip: "::"
    module: ejabberd_c2s
    ##
    ## If TLS is compiled in and you installed a SSL
    ## certificate, specify the full path to the
    ## file and uncomment this line:
    ##
    certfile: "/etc/ejabberd/ejabberd.pem"
    starttls: true
    ##
    ## Custom OpenSSL options
    ##
    protocol_options:
      - "no_sslv3"
    ##   - "no_tlsv1"
    max_stanza_size: 65536
    shaper: c2s_shaper
    access: c2s
  - 
    port: 5269
    ip: "::"
    module: ejabberd_s2s_in
  ##
  ## ejabberd_service: Interact with external components (transports, ...)
  ##
  ## - 
  ##   port: 8888
  ##   module: ejabberd_service
  ##   access: all
  ##   shaper_rule: fast
  ##   ip: "127.0.0.1"
  ##   hosts:
  ##     "icq.example.org":
  ##       password: "secret"
  ##     "sms.example.org":
  ##       password: "secret"

  ##
  ## ejabberd_stun: Handles STUN Binding requests
  ##
  ## - 
  ##   port: 3478
  ##   transport: udp
  ##   module: ejabberd_stun

  ##
  ## To handle XML-RPC requests that provide admin credentials:
  ##
  ## - 
  ##   port: 4560
  ##   module: ejabberd_xmlrpc
  - 
    port: 5280
    ip: "::"
    module: ejabberd_http
    ## request_handlers:
    ##   "/pub/archive": mod_http_fileserver
    web_admin: true
    http_poll: true
    http_bind: true
    ## register: true
    captcha: true

##
## s2s_use_starttls: Enable STARTTLS + Dialback for S2S connections.
## Allowed values are: false optional required required_trusted
## You must specify a certificate file.
##
s2s_use_starttls: optional

##
## s2s_certfile: Specify a certificate file.
##
s2s_certfile: "/etc/ejabberd/ejabberd.pem"

## Custom OpenSSL options
##
s2s_protocol_options:
  - "no_sslv3"
##   - "no_tlsv1"

##
## domain_certfile: Specify a different certificate for each served hostname.
##
## host_config:
##   "example.org":
##     domain_certfile: "/path/to/example_org.pem"
##   "example.com":
##     domain_certfile: "/path/to/example_com.pem"

##
## S2S whitelist or blacklist
##
## Default s2s policy for undefined hosts.
##
## s2s_access: s2s

##
## Outgoing S2S options
##
## Preferred address families (which to try first) and connect timeout
## in milliseconds.
##
## outgoing_s2s_families:
##   - ipv4
##   - ipv6
## outgoing_s2s_timeout: 10000

###   ==============
###   AUTHENTICATION

##
## auth_method: Method used to authenticate the users.
## The default method is the internal.
## If you want to use a different method,
## comment this line and enable the correct ones.
##
## auth_method: internal

##
## Store the plain passwords or hashed for SCRAM:
## auth_password_format: plain
## auth_password_format: scram
##
## Define the FQDN if ejabberd doesn't detect it:
## fqdn: "server3.example.com"

##
## Authentication using external script
## Make sure the script is executable by ejabberd.
##
## auth_method: external
## extauth_program: "/path/to/authentication/script"

##
## Authentication using ODBC
## Remember to setup a database in the next section.
##
## auth_method: odbc

##
## Authentication using PAM
##
## auth_method: pam
## pam_service: "pamservicename"

##
## Authentication using LDAP
##
auth_method: ldap
##
## List of LDAP servers:
ldap_servers:
  - "172.17.2.4"
##
## Encryption of connection to LDAP servers:
## ldap_encrypt: none
## ldap_encrypt: tls
##
## Port to connect to on LDAP servers:
## ldap_port: 389
## ldap_port: 636
##
## LDAP manager:
## ldap_rootdn: "cn=admin,dc=fundacite-sucre,dc=gob,dc=ve"
##
## Password of LDAP manager:
## ldap_password: "******"
##
## Search base of LDAP directory:
ldap_base: "dc=fundacite-sucre,dc=gob,dc=ve"
##
## LDAP attribute that holds user ID:
## ldap_uids:
##   - "mail": "%u@mail.example.org"
##
## LDAP filter:
## ldap_filter: "(objectClass=shadowAccount)"

##
## Anonymous login support:
##   auth_method: anonymous
##   anonymous_protocol: sasl_anon | login_anon | both
##   allow_multiple_connections: true | false
##
## host_config:
##   "public.example.org":
##     auth_method: anonymous
##     allow_multiple_connections: false
##     anonymous_protocol: sasl_anon
##
## To use both anonymous and internal authentication:
##
## host_config:
##   "public.example.org":
##     auth_method:
##       - internal
##       - anonymous

###   ==============
###   DATABASE SETUP

## ejabberd by default uses the internal Mnesia database,
## so you do not necessarily need this section.
## This section provides configuration examples in case
## you want to use other database backends.
## Please consult the ejabberd Guide for details on database creation.

##
## MySQL server:
##
## odbc_type: mysql
## odbc_server: "server"
## odbc_database: "database"
## odbc_username: "username"
## odbc_password: "password"
##
## If you want to specify the port:
## odbc_port: 1234

##
## PostgreSQL server:
##
## odbc_type: pgsql
## odbc_server: "server"
## odbc_database: "database"
## odbc_username: "username"
## odbc_password: "password"
##
## If you want to specify the port:
## odbc_port: 1234
##
## If you use PostgreSQL, have a large database, and need a
## faster but inexact replacement for "select count(*) from users"
##
## pgsql_users_number_estimate: true

##
## ODBC compatible or MSSQL server:
##
## odbc_type: odbc
## odbc_server: "DSN=ejabberd;UID=ejabberd;PWD=ejabberd"

##
## Number of connections to open to the database for each virtual host
##
## odbc_pool_size: 10

##
## Interval to make a dummy SQL request to keep the connections to the
## database alive. Specify in seconds: for example 28800 means 8 hours
##
## odbc_keepalive_interval: undefined

###   ===============
###   TRAFFIC SHAPERS

shaper:
  ##
  ## The "normal" shaper limits traffic speed to 1000 B/s
  ##
  normal: 1000

  ##
  ## The "fast" shaper limits traffic speed to 50000 B/s
  ##
  fast: 50000

##
## This option specifies the maximum number of elements in the queue
## of the FSM. Refer to the documentation for details.
##
max_fsm_queue: 1000

###.   ====================
###'   ACCESS CONTROL LISTS
acl:
  ##
  ## The 'admin' ACL grants administrative privileges to XMPP accounts.
  ## You can put here as many accounts as you want.
  ##
  admin:
     user:
         - "cpinto": "fundacite-sucre.gob.ve"

  ##
  ## Blocked users
  ##
  ## blocked:
  ##   user:
  ##     - "baduser": "example.org"
  ##     - "test"

  ## Local users: don't modify this.
  ##
  local: 
    user_regexp: ""

  ##
  ## More examples of ACLs
  ##
  ## jabberorg:
  ##   server:
  ##     - "jabber.org"
  ## aleksey:
  ##   user:
  ##     - "aleksey": "jabber.ru"
  ## test:
  ##   user_regexp: "^test"
  ##   user_glob: "test*"

  ##
  ## Loopback network
  ##
  loopback:
    ip:
      - "127.0.0.0/8"

  ##
  ## Bad XMPP servers
  ##
  ## bad_servers:
  ##   server:
  ##     - "xmpp.zombie.org"
  ##     - "xmpp.spam.com"

##
## Define specific ACLs in a virtual host.
##
## host_config:
##   "localhost":
##     acl:
##       admin:
##         user:
##           - "bob-local": "localhost"

###   ============
###   ACCESS RULES
access:
  ## Maximum number of simultaneous sessions allowed for a single user:
  max_user_sessions: 
    all: 10
  ## Maximum number of offline messages that users can have:
  max_user_offline_messages: 
    admin: 5000
    all: 100
  ## This rule allows access only for local users:
  local: 
    local: allow
  ## Only non-blocked users can use c2s connections:
  c2s: 
    blocked: deny
    all: allow
  ## For C2S connections, all users except admins use the "normal" shaper
  c2s_shaper: 
    admin: none
    all: normal
  ## All S2S connections use the "fast" shaper
  s2s_shaper: 
    all: fast
  ## Only admins can send announcement messages:
  announce: 
    admin: allow
  ## Only admins can use the configuration interface:
  configure: 
    admin: allow
  ## Admins of this server are also admins of the MUC service:
  muc_admin: 
    admin: allow
  ## Only accounts of the local ejabberd server can create rooms:
  muc_create: 
    local: allow
  ## All users are allowed to use the MUC service:
  muc: 
    all: allow
  ## Only accounts on the local ejabberd server can create Pubsub nodes:
  pubsub_createnode: 
    local: allow
  ## In-band registration allows registration of any possible username.
  ## To disable in-band registration, replace 'allow' with 'deny'.
  register: 
    all: allow
  ## Only allow to register from localhost
  trusted_network: 
    loopback: allow
  ## Do not establish S2S connections with bad servers
  ## s2s: 
  ##   bad_servers: deny
  ##   all: allow

## By default the frequency of account registrations from the same IP
## is limited to 1 account every 10 minutes. To disable, specify: infinity
## registration_timeout: 600
  
##
## Define specific Access Rules in a virtual host.
##
## host_config:
##   "localhost":
##     access:
##       c2s:
##         admin: allow
##         all: deny
##       register:
##         all: deny

###   ================
###   DEFAULT LANGUAGE

##
## language: Default language used for server messages.
##
language: "en"

##
## Set a different default language in a virtual host.
##
## host_config:
##   "localhost":
##     language: "ru"

###   =======
###   CAPTCHA

##
## Full path to a script that generates the image.
##
## captcha_cmd: "/lib/ejabberd/priv/bin/captcha.sh"

##
## Host for the URL and port where ejabberd listens for CAPTCHA requests.
##
## captcha_host: "example.org:5280"

##
## Limit CAPTCHA calls per minute for JID/IP to avoid DoS.
##
## captcha_limit: 5

###   =======
###   MODULES

##
## Modules enabled in all ejabberd virtual hosts.
##
modules: 
  mod_adhoc: {}
  mod_announce: # recommends mod_adhoc
    access: announce
  mod_blocking: {} # requires mod_privacy
  mod_caps: {}
  mod_carboncopy: {}
  mod_configure: {} # requires mod_adhoc
  mod_disco: {}
  ## mod_echo: {}
  mod_irc: {}
  mod_http_bind: {}
  ## mod_http_fileserver:
  ##   docroot: "/var/www"
  ##   accesslog: "/var/log/ejabberd/access.log"
  mod_last: {}
  mod_muc: 
    ## host: "conference.@HOST@"
    access: muc
    access_create: muc_create
    access_persistent: muc_create
    access_admin: muc_admin
  ## mod_muc_log: {}
  mod_offline: 
    access_max_user_messages: max_user_offline_messages
  mod_ping: {}
  ## mod_pres_counter:
  ##   count: 5
  ##   interval: 60
  mod_privacy: {}
  mod_private: {}
  ## mod_proxy65: {}
  mod_pubsub: 
    access_createnode: pubsub_createnode
    ## reduces resource comsumption, but XEP incompliant
    ignore_pep_from_offline: true
    ## XEP compliant, but increases resource comsumption
    ## ignore_pep_from_offline: false
    last_item_cache: false
    plugins: 
      - "flat"
      - "hometree"
      - "pep" # pep requires mod_caps
  mod_register: 
    ##
    ## Protect In-Band account registrations with CAPTCHA.
    ##
    ## captcha_protected: true

    ##
    ## Set the minimum informational entropy for passwords.
    ##
    ## password_strength: 32

    ##
    ## After successful registration, the user receives
    ## a message with this subject and body.
    ##
    welcome_message: 
      subject: "Welcome!"
      body: |-
        Hi.
        Welcome to this XMPP server.

    ##
    ## When a user registers, send a notification to
    ## these XMPP accounts.
    ##
    ## registration_watchers:
    ##   - "admin1@example.org"

    ##
    ## Only clients in the server machine can register accounts
    ##
    ip_access: trusted_network

    ##
    ## Local c2s or remote s2s users cannot register accounts
    ##
    ## access_from: deny

    access: register
  mod_roster: {}
  mod_shared_roster: {}
  mod_stats: {}
  mod_time: {}
  mod_vcard: {}
  mod_version: {}

##
## Enable modules with custom options in a specific virtual host
##
## append_host_config:
##   "localhost":
##     modules:
##       mod_echo:
##         host: "mirror.localhost"

### Local Variables:
### mode: yaml
### End:
### vim: set filetype=yaml tabstop=8 `,
    image: '',
    
  },
  {
    id: 12,
    title: 'Reinicioamos el servicio y verificamos con algun cliente de jabber la conexión al mismo.',
    description: `' Para activar la lista de usuarios única para todas las cuentas, es necesario ingresar a http://platon.fundacite-sucre.gob.ve:5280/admin/ ingresar el usuario cpinto@fundacite-sucre.gob.ve, dado que es el que se encuentra configurado en ejabberd.yml para la administración del servicio.
http://platon.fundacite-sucre.gob.ve:5280/admin/'`,
    code: `root@platon:~# service ejabberd restart`,
    image: '/Platon/PlatonEjabberd2parte1.png'
  },
  
  { id: 13,
    title: 'Ingresara Dominios Virtuales → fundacite-sucre.gob.ve → Grupos Compartidos ',
    description: `'Añadir un nuevo grupo llamado 'fundacitesucre' '`,
    image: '/Platon/platon ejabberd2 parte2.png'
  },
  { id: 14,
    title: 'Ingresar al grupo crecien creado y editar los campos tal como se muestran en la imagen ',
    description: `Guardar los cambios y al reconectarse el usuario ya tendrá el grupo Fundacite Sucre con el listado de usuarios existentes en el ldap. '`,
    image: '/Platon/platon ejabberd2 parte3.png'
  },
  { id: 15,
    title: ' - Configuración del phpldapadmin ',
    description: `Editar las siguientes variables en el archivo /etc/phpldapadmin/config.php `,
    code: `$servers = new Datastore();
$servers->newServer('ldap_pla');
$servers->setValue('server','name','LDAP FUNDACITE SUCRE');
$servers->setValue('server','host','172.17.2.4');
$servers->setValue('server','port',389);
$servers->setValue('server','base',array('dc=fundacite-sucre,dc=gob,dc=ve'));
$servers->setValue('login','auth_type','session');
$servers->setValue('login','bind_id','cn=admin,dc=fundacite-sucre,dc=gob,dc=ve');
$servers->setValue('login','bind_pass','');`,
    image: ''
  },
  { id: 16,
    title: 'Generar certificado para ejabberd',
    description: ` `,
    code: `:~# cd /etc/ejabberd
:~# openssl req -new -x509 -newkey rsa:1024 -days 365 -keyout privkey.pem -out ejabberd.pem
:~# openssl rsa -in privkey.pem -out privkey.pem
:~# cat privkey.pem >> ejabberd.pem
:~# rm privkey.pem
:~# rm privkey.pem`,
    image: ''
  }
])

const editingId = ref(null)
const copiedId = ref(null) // Estado para saber qué bloque se copió

const highlight = (code) => {
  if (!code) return ''
  return hljs.highlightAuto(code).value
}

const copyCode = async (id, text) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000) // Restaurar texto del botón después de 2s
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}
</script>


<template>
  <!-- Contenedor principal que centra todo el contenido en la pantalla -->
    <div class="doc-container">

    <!-- Navegación superior: Botones para ir al Menú y al Plan de Contingencia -->
    <div class="nav-links">
      <router-link to="/" class="nav-btn">Ir al Menú Principal</router-link>
      <router-link to="/system" class="nav-btn">Ver Plan de Contingencia</router-link>
    </div>

    <!-- Encabezado del documento -->
    <header class="doc-header">
      <h1>Documentación del Servidor PLATON</h1>
      <p>Guía detallada y editable para la configuración y servicios del servidor PLATON. Todas las secciones son editables.</p>
    </header>

    <!-- 
      Bucle (v-for): Crea una sección por cada elemento en 'sections'.
      Cada sección tiene título, descripción, área de código gris editable, e imagen opcional.
    -->
    <div v-for="section in sections" :key="section.id" class="doc-section">
      
      <!-- Título de la sección -->
      <div class="section-header">
        <h2>{{ section.title }}</h2>
      </div>

      <!-- Descripción de la sección -->
      <div class="section-description">
        <p>{{ section.description }}</p>
      </div>

      <!-- Área de Código Editable: Esta es la parte gris donde puedes copiar y pegar el código -->
      <div v-if="section.code" class="section-code">
        <!-- Cabecera del código con etiqueta y botón de copiar -->
        <div class="code-header">
          <span class="code-label">Configuración / Código</span>
          <button @click.stop="copyCode(section.id, section.code)" class="copy-btn">
            {{ copiedId === section.id ? '¡Copiado!' : 'Copiar' }}
          </button>
        </div>

        <div v-if="editingId === section.id">
          <textarea 
            v-model="section.code" 
            placeholder="Copia y pega aquí el código o configuración correspondiente. Este área es editable."
            rows="10"
            @blur="editingId = null"
            autofocus
          ></textarea>
          <small style="color: #666; display: block; margin-top: 5px;">Haz clic fuera para guardar y ver resaltado.</small>
        </div>
        <div v-else @click="editingId = section.id" class="code-preview" title="Haz clic para editar">
          <pre><code class="hljs" v-html="highlight(section.code)"></code></pre>
        </div>
      </div>

      <!-- Imagen opcional: Si hay imagen, se muestra aquí -->
      <div v-if="section.image" class="section-image">
        <img :src="section.image" :alt="section.title" />
    </div>

  </div>
    </div>
</template>

<style scoped>
/* Estilos para que se vea bonito y ordenado */

.nav-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.nav-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #0056b3;
}

.doc-container {
  max-width: 900px; /* Ancho mayor para acomodar código */
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #eee;
}

.doc-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.section-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #2c3e50;
}

.section-description {
  padding: 15px 20px;
  background-color: #fff;
}

.section-description p {
  margin: 0;
  line-height: 1.6;
}

/* Parte gris para el código editable */
.section-code {
  padding: 10px 15px; /* Reducimos el padding interno */
  background-color: #f8f9fa;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.code-label {
  font-weight: bold;
  color: #555;
  font-size: 0.9rem;
}

.copy-btn {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.copy-btn:hover {
  background-color: #f0f0f0;
  border-color: #bbb;
}

/* Mejora la caja de previsualización para que sea consistente */
.code-preview {
  cursor: pointer;
  background-color: #282c34; 
  border: 1px solid #181a1f;
  border-radius: 4px;

  /* --- LO NUEVO PARA LA VISTA PREVIA --- */
  resize: vertical; 
  min-height: 50px;  /* Para que los cortos de 2 líneas se vean bien */
  max-height: 500px; /* El límite máximo igual que el textarea */
  overflow: auto;    /* La barra de scroll si el código es larguísimo */
}

/* Ajuste del pre y code para eliminar márgenes extraños */
.code-preview pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
}
.hljs {
  padding: 15px !important;
  background: transparent !important; /* Deja que el contenedor mande */
}
/* Esto asegura que el área de edición sea igual de oscura que el código */
.section-code textarea {
  width: 100%;
  border: 1px solid #181a1f; 
  background-color: #282c34;   
  color: #abb2bf;             
  caret-color: #528bff;       
  font-family: 'Fira Code', 'Courier New', monospace; 
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 15px;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  display: block;

  /* --- LO NUEVO PARA EL TEXTAREA --- */
  resize: vertical; 
  max-height: 500px; /* Evita que crezca infinitamente */
  overflow: auto;    /* Pone la barra de scroll si pasa los 400px */
}
/* Para que al hacer focus no pierda el estilo */
.section-code textarea:focus {
  border-color: #4b5263;
  background-color: #2c313a; 
}

.section-image {
  padding: 20px;
  text-align: center;
  background-color: #fff;
}

.section-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.back-link {
  text-align: center;
  margin-top: 40px;
}

.back-link a {
  color: #007bff;
  text-decoration: none;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>