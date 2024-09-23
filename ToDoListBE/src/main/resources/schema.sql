CREATE TABLE IF NOT EXISTS ToDoUser(
    id serial PRIMARY KEY,
    username varchar(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ToDo(
    id serial PRIMARY KEY,
    userid integer REFERENCES ToDoUser (id),
    title varchar(100) NOT NULL,
    description text,
    completeBy date NOT NULL,
    status varchar(11),
    CONSTRAINT check_status CHECK (status IN ('COMPLETED','LATE','IN_PROGRESS'))
);

