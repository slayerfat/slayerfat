CREATE TABLE post( 
  codigo int unsigned auto_increment PRIMARY KEY, 
  titulo varchar(64) NOT NULL DEFAULT "-", 
  subtitulo varchar(256) NOT NULL DEFAULT "",
  status tinyint(1) unsigned NOT NULL default 1,
  codUsrReg int unsigned not null,
  ipUsrReg varchar(40) not null,
  fecReg date not null,
  codUsrMod int unsigned not null,
  ipUsrMod varchar(40) not null,
  fecMod date not null,
  foreign key (codUsrReg)
    references usuario(codigo)
    on update cascade
    on delete restrict,
  foreign key (codUsrMod)
    references usuario(codigo)
    on update cascade
    on delete restrict
)
CHARACTER SET utf8 
COLLATE utf8_general_ci;
