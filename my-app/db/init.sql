CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Trip',
    polyline_points TEXT DEFAULT '',
    full_distance INTEGER[] DEFAULT '{}',
    full_duration INTEGER[] DEFAULT '{}'
);

CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    uf CHAR(2) NOT NULL,
    name TEXT NOT NULL
    );

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    uf_id INTEGER REFERENCES states(id) ON DELETE RESTRICT,
    latitude float NOT NULL,
    longitude float NOT NULL
);


CREATE TABLE stops (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    city_id INTEGER REFERENCES cities(id) ON DELETE RESTRICT,
    position INTEGER NOT NULL
);
