SELECT ST_Envelope(geom), ST_AsText(ST_Envelope(geom))
FROM cm_changpeuk

SELECT ST_Boundary(geom)
FROM cm_changpeuk

SELECT ST_AsText(ST_Segmentize(
ST_GeomFromText('MULTILINESTRING((-29 -27,-30 -29.7,-36 -31,-45 -33),(-45 -33,-46 -32))'),2));

SELECT ST_IsValid(ST_GeomFromText('LINESTRING(0 0, 1 1)')) As good_line,
	ST_IsValid(ST_GeomFromText('POLYGON((0 0, 1 1, 1 2, 1 1, 0 0))')) As bad_poly

SELECT ST_IsValid(ST_GeomFromText('LINESTRING(0 0, 1 1)')) As good_line,
	ST_IsValidDetail(ST_GeomFromText('POLYGON((0 0, 1 1, 1 2, 1 1, 0 0))')) As bad_poly


SELECT ST_SRID(geom) FROM cm_vill_4326

SELECT ST_AsText(geom), ST_AsText(ST_Transform(geom, 32647)) FROM cm_vill_4326

SELECT ST_GeomFromText('POINT(98.95011086901077,18.80281732795626)');

SELECT ST_AsText(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[98.95011086901077,18.80281732795626]}')) As wkt,
ST_GeomFromGeoJSON('{"type":"Point","coordinates":[98.95011086901077,18.80281732795626]}') as geom

SELECT ST_AsText(geom) FROM cm_vill_4326
SELECT ST_AsLatLonText(geom) FROM cm_vill_4326
SELECT ST_AsGeoJson(geom) FROM cm_vill_4326

SELECT ST_Area(geom) FROM cm_tam_4326
SELECT ST_Area(ST_Transform(geom, 32647)) FROM cm_tam_4326

SELECT ST_Length(geom) FROM cm_trans_4326
SELECT ST_Length(ST_Transform(geom,32647)) FROM cm_trans_4326

SELECT ST_AsText(
	ST_ShortestLine('POINT(100 100)'::geometry,
		'LINESTRING (20 80, 98 190, 110 180, 50 75 )'::geometry)
	) As sline;


SELECT ST_Buffer(
 ST_GeomFromText('POINT(100 90)'),
 50, 'quad_segs=8');

 SELECT
    ST_VoronoiPolygons(geom) As geom
FROM (SELECT 'MULTIPOINT (50 30, 60 30, 100 100,10 150, 110 120)'::geometry As geom ) As g