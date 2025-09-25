import pool from "../config/db";
import type { Trip, Stop, City } from "../interfaces/trip.interface";


// createTrip
export const createTrip = async () => {
  const result = await pool.query(
    `INSERT INTO trips DEFAULT VALUES RETURNING *`
  );
  return result.rows[0];
};

export const getAllTrips = async () => {
  const result = await pool.query(`SELECT * FROM trips`);
  return result.rows;
};

export const getTrip = async (tripId: number): Promise<Trip | null> => {
  const tripRes = await pool.query("SELECT * FROM trips WHERE id = $1", [tripId]);
  if (tripRes.rows.length === 0) return null;

  const trip = {
    id: tripRes.rows[0].id,
    name: tripRes.rows[0].name,
    stops: [] as Stop[],
  };

  const stopsRes = await pool.query(
    `
    SELECT 
      s.id as stop_id, s.position,
      c.id as city_id, c.name as city_name, c.uf, c.latitude, c.longitude
    FROM stops s
    JOIN cities c ON s.city_id = c.id
    WHERE s.trip_id = $1
    ORDER BY s.position
    `,
    [tripId]
  );

  trip.stops = stopsRes.rows.map((row) => ({
    id: row.stop_id,
    position: row.position, 
    city: {
      id: row.city_id,
      name: row.city_name,
      uf: row.uf,
      latitude: row.latitude,
      longitude: row.longitude,
    },
  }));

  return trip;
};

export const deleteTrip = async (tripId: number) => {
  await pool.query(`DELETE FROM trips WHERE id = $1`, [tripId]);
};


export const addStop = async (tripId: number, stopData: { cityId: number; }) => {
  const result = await pool.query(
    `INSERT INTO stops (trip_id, city_id, position) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM stops WHERE trip_id = $1) ) RETURNING *`,
    [tripId, stopData.cityId]
  );
  return result.rows[0];
};

export const deleteStop = async (stopId: number) => {
  // First, get the trip_id of the stop to be deleted
  const result = await pool.query(`SELECT trip_id FROM stops WHERE id = $1`, [stopId]);
  const tripId = result.rows[0]?.trip_id;

  // reorder remaining stops
  if (tripId) {
    await pool.query(
      `UPDATE stops SET stop_order = stop_order - 1 WHERE trip_id = $1 AND stop_order > (SELECT stop_order FROM stops WHERE id = $2)`,
      [tripId, stopId]
    );
  }

  await pool.query(`DELETE FROM stops WHERE id = $1`, [stopId]);
};


export const reorderStops = async (tripId: number, newOrder: number[]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (let i = 0; i < newOrder.length; i++) {
      const stopId = newOrder[i];
      await client.query(
        `UPDATE stops SET position = $1 WHERE id = $2 AND trip_id = $3`,
        [i + 1, stopId, tripId]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


export const getCityById = async (cityId: number): Promise<City | null> => {
  const result = await pool.query(`SELECT * FROM cities WHERE id = $1`, [cityId]);
  if (result.rows.length === 0) return null;
  return result.rows[0];
};