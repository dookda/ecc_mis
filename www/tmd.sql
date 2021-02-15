-- DROP VIEW public.v_tmd_weather_3hr_eec;

CREATE OR REPLACE VIEW public.v_tmd_weather_3hr_eec
 AS
 SELECT s.gid,
    s.sta_num,
    s.sta_th,
    s.sta_en,
    s.province,
    s.lat,
    s.lon,
    s.datetime,
    s.sta_pressure,
    s.msl_pressure,
    s.max_temp,
    s.air_temp,
    s.dew,
    s.rh,
    s.var_pressure,
    s.land_vis,
    s.winddir,
    s.windspeed,
    s.rainfall,
    s.rain24hr,
    to_char(s.datetime, 'YYYY-MM-DD'::text) AS date_,
    to_char(s.datetime, 'HH24:MM'::text) AS time_,
    st_setsrid(st_makepoint(s.lon::double precision, s.lat::double precision), 4326) AS geom
   FROM ( SELECT weather_3hr_tmd.gid,
            weather_3hr_tmd.sta_num,
            weather_3hr_tmd.sta_th,
            weather_3hr_tmd.sta_en,
            weather_3hr_tmd.province,
            weather_3hr_tmd.lat,
            weather_3hr_tmd.lon,
            weather_3hr_tmd.datetime,
            weather_3hr_tmd.sta_pressure,
            weather_3hr_tmd.msl_pressure,
            weather_3hr_tmd.max_temp,
            weather_3hr_tmd.air_temp,
            weather_3hr_tmd.dew,
            weather_3hr_tmd.rh,
            weather_3hr_tmd.var_pressure,
            weather_3hr_tmd.land_vis,
            weather_3hr_tmd.winddir,
            weather_3hr_tmd.windspeed,
            weather_3hr_tmd.rainfall,
            weather_3hr_tmd.rain24hr
           FROM weather_3hr_tmd
          WHERE weather_3hr_tmd.province::text = 'ระยอง'::text OR weather_3hr_tmd.province::text = 'ชลบุรี'::text OR weather_3hr_tmd.province::text = 'ฉะเชิงเทรา'::text OR weather_3hr_tmd.sta_num::text = '48420'::text OR weather_3hr_tmd.sta_num::text = '48429'::text OR weather_3hr_tmd.sta_num::text = '48430'::text OR weather_3hr_tmd.sta_num::text = '48439'::text OR weather_3hr_tmd.sta_num::text = '48440'::text OR weather_3hr_tmd.sta_num::text = '48480'::text) s
     JOIN ( SELECT weather_3hr_tmd.sta_num,
            max(weather_3hr_tmd.datetime) AS dt
           FROM weather_3hr_tmd
          GROUP BY weather_3hr_tmd.sta_num) n ON s.sta_num::text = n.sta_num::text
  WHERE s.datetime = n.dt;