CREATE TABLE especialidades( 
      id  SERIAL    NOT NULL  , 
      nome char  (255)   NOT NULL  , 
      criado_em timestamp   NOT NULL  , 
PRIMARY KEY (id)); 

CREATE TABLE doutores( 
      id  SERIAL    NOT NULL  , 
      nome char  (255)   NOT NULL  , 
      criado_em timestamp   , 
PRIMARY KEY (id)) ;
 
CREATE TABLE pacientes( 
      id  SERIAL    NOT NULL  , 
      nome char  (255)   NOT NULL  , 
      ultimo_nome char  (255)   NOT NULL  , 
      email char  (255)   NOT NULL  , 
      cpf char  (14)   NOT NULL  , 
      senha char  (255)   NOT NULL  , 
      criado_em timestamp   NOT NULL  , 
      ativo boolean   NOT NULL    DEFAULT false, 
      column_9 integer   , 
      foto text   , 
      rg char  (10)   , 
      data_nascimento date   , 
      numero_celular char  (255)   , 
PRIMARY KEY (id)) ; 

ALTER TABLE pacientes ADD UNIQUE (email);
ALTER TABLE pacientes ADD UNIQUE (cpf);

CREATE TABLE agendamentos( 
      id  SERIAL    NOT NULL  , 
      dia timestamp   NOT NULL  , 
      criado_em timestamp   NOT NULL  , 
      razao_consulta text   NOT NULL  , 
      necessidade_especial text   , 
      pcd boolean   NOT NULL  , 
      doenca_cronica boolean   NOT NULL  , 
      status char  (255)   NOT NULL  , 
      cancelado boolean   NOT NULL    DEFAULT false, 
      pacientes_id integer   NOT NULL  , 
      especialidades_id integer   NOT NULL  , 
      doutores_id integer   NOT NULL  , 
PRIMARY KEY (id)) ; 
  
ALTER TABLE agendamentos ADD CONSTRAINT fk_agendamentos_1 FOREIGN KEY (especialidades_id) references especialidades(id); 
ALTER TABLE agendamentos ADD CONSTRAINT fk_agendamentos_2 FOREIGN KEY (doutores_id) references doutores(id); 
ALTER TABLE agendamentos ADD CONSTRAINT fk_agendamentos_3 FOREIGN KEY (pacientes_id) references pacientes(id);