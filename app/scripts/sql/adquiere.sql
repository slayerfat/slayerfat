CREATE table adquiere(
  codigo int unsigned auto_increment primary key,
  codPost int unsigned not null,
  codParrafo int unsigned not null,
  status tinyint(1) unsigned NOT NULL default 1,
  codUsrReg int unsigned not null,
  ipUsrReg varchar(40) not null,
  fecReg date not null,
  codUsrMod int unsigned not null,
  ipUsrMod varchar(40) not null,
  fecMod date not null,
  foreign key (codPost)
    references post(codigo)
    on update cascade
    on delete restrict,
  foreign key (codParrafo)
    references parrafo(codigo)
    on update cascade
    on delete restrict,
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
COMMENT = 'relacion de post y parrafo';
