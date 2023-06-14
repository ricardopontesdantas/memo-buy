drop schema memobuy cascade;

create schema memobuy;

create table memobuy.memory (
    id_memory text not null,
    id_user text not null,
    description text not null,
    done boolean not null default false,
    created_at timestamp not null default now(),
    updated_at timestamp
);

