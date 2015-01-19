CREATE table imagen(
  codigo int unsigned auto_increment primary key,
  nombre varchar(200) not null,
  direccion varchar(500) not null,
  alto float(14,8) unsigned not null default 0,
  ancho float(14,8) unsigned not null default 0,
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
COLLATE utf8_general_ci
COMMENT = 'relacionado con post';
