--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '715ebeec-3726-4a44-b4e2-e8c8c3343fc2', '{"action":"user_confirmation_requested","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-23 21:36:17.379786+00', ''),
	('00000000-0000-0000-0000-000000000000', '802c864f-24ef-48f8-8cbc-0c636deb1854', '{"action":"user_signedup","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-12-23 21:40:27.575091+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac96744b-60cc-40af-b604-2780f64870de', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:40:59.65053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bcc74621-9f75-481b-ae30-811ad495dcb1', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:41:00.718736+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cc4375b-834f-4d5e-b75b-bc05df45b688', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 21:43:32.325774+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a97b966c-d2af-459e-b5b8-7a90d045c19e', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:43:43.088335+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c79904f3-08fc-465c-ae17-bc7a868e2f93', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:43:58.816761+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b88316d-48b9-4259-aa56-e6e9e3a7e000', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:44:00.224214+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae61aaaa-e39a-45d8-a6c9-630893ea7197', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:44:00.671231+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d3b6688-4bcc-4f1c-91cc-f0113992ce43', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:44:04.451935+00', ''),
	('00000000-0000-0000-0000-000000000000', '38719f51-debf-436d-ad3b-2060006110b2', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:45:24.502894+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1177f20-07c0-4f74-be49-55818951a249', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:45:44.239692+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4644b3c-ccbd-4112-9130-899a7027af02', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:45:45.793444+00', ''),
	('00000000-0000-0000-0000-000000000000', '77192e12-f2a7-4047-bb0f-5e960353b659', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:45:50.962422+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c16474c6-5ac6-438f-9ebc-be467100c963', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:46:14.886496+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c70bc4a-26e6-465e-88b2-f51fe7d59973', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:46:51.325216+00', ''),
	('00000000-0000-0000-0000-000000000000', '8dcbfa40-18b2-4c4a-8d22-e7537542117d', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:53:12.973691+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c925793-fafe-4b43-8053-21960595ee39', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 21:53:15.006835+00', ''),
	('00000000-0000-0000-0000-000000000000', '6857ee34-c89e-47ea-a63c-3bbf58feb699', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:53:27.680112+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c49de877-8eb5-4caa-b21c-e1da5e5c21ac', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 21:53:30.278612+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adf9ee32-35f9-4954-b282-a1561db9c515', '{"action":"user_confirmation_requested","actor_id":"7d4eb6af-f00e-4aa9-a58a-ddbdd13ea430","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-23 21:53:45.698142+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e674a35f-8080-470c-a1ce-6202255b83e0', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 21:54:50.412833+00', ''),
	('00000000-0000-0000-0000-000000000000', '793f63f8-5f33-4cab-b1e1-d1dab77ddb51', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 21:54:53.454485+00', ''),
	('00000000-0000-0000-0000-000000000000', '4b8c688c-39c8-494d-b1d0-25e567c8bc01', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 22:05:58.53961+00', ''),
	('00000000-0000-0000-0000-000000000000', '4cec3ad7-d269-4ebf-97e1-eeb8ef13532e', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 22:06:07.043795+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a208d887-5c66-4561-b3b6-8abfa70f479f', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 22:08:25.159131+00', ''),
	('00000000-0000-0000-0000-000000000000', '99b19071-2c7c-4dd1-a08d-36f94040f00d', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 22:08:29.429372+00', ''),
	('00000000-0000-0000-0000-000000000000', 'afbed177-38a6-491c-b270-825e35fee98c', '{"action":"user_signedup","actor_id":"7d4eb6af-f00e-4aa9-a58a-ddbdd13ea430","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-12-23 22:08:54.798994+00', ''),
	('00000000-0000-0000-0000-000000000000', '006094aa-56a0-49cb-aead-3d9a04e1c9af', '{"action":"login","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-23 22:25:41.705928+00', ''),
	('00000000-0000-0000-0000-000000000000', '27fe623a-e6b6-4345-9bc0-924b0429b73e', '{"action":"logout","actor_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-23 22:25:43.424057+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a76d9b5c-4f8f-48ad-9cbd-15f1142a9c04', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ivan.r.robert@gmail.com","user_id":"b1ec39b8-c6f9-4a5e-8c21-dc50bb412d8a","user_phone":""}}', '2023-12-23 22:26:10.563996+00', ''),
	('00000000-0000-0000-0000-000000000000', '25deb1a9-697c-4e8c-af81-6eef99107af5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ivan.rog.robert@gmail.com","user_id":"7d4eb6af-f00e-4aa9-a58a-ddbdd13ea430","user_phone":""}}', '2023-12-23 22:26:13.904358+00', ''),
	('00000000-0000-0000-0000-000000000000', '5158df2f-f7e5-44a9-ad0f-25beea6fc2fe', '{"action":"user_confirmation_requested","actor_id":"000065fe-0d18-4b5d-a1d9-c45ada262f70","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-23 22:26:37.856937+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e8b4c0e-a49a-4f18-9973-38d5b10d4ee6', '{"action":"user_confirmation_requested","actor_id":"80f35be2-5582-447b-be62-bf1efdd2ecf4","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-23 23:24:05.754767+00', ''),
	('00000000-0000-0000-0000-000000000000', '34ac695c-679b-44fe-8bce-9772ff45b03e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ivan.r.robert@gmail.com","user_id":"000065fe-0d18-4b5d-a1d9-c45ada262f70","user_phone":""}}', '2023-12-24 16:33:57.30902+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea433b4d-4e9e-483c-8e3a-5159aa125d93', '{"action":"user_confirmation_requested","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 16:34:18.000097+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bcd0e0f-333b-4c0f-b7da-4ceb348936a9', '{"action":"user_signedup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-12-24 16:34:31.729238+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c54199f-fe07-44b5-bc66-11bb9365e4a9', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 16:36:14.002517+00', ''),
	('00000000-0000-0000-0000-000000000000', '43172bd4-8c5d-4c82-8253-d0026bbe5a94', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 16:47:20.671858+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a6b822d-261d-47a3-8874-afc2014cbd51', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 17:00:47.459976+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbe37da9-4352-46c8-976a-f4126e9b0daa', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 17:35:44.503123+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c704aa63-0306-446f-82ad-591efb752a28', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ivan.rog.robert@gmail.com","user_id":"80f35be2-5582-447b-be62-bf1efdd2ecf4","user_phone":""}}', '2023-12-24 21:21:33.010123+00', ''),
	('00000000-0000-0000-0000-000000000000', '37434226-353b-4776-be15-063234826635', '{"action":"user_confirmation_requested","actor_id":"39761db4-8f2d-4281-add3-4bfc65495978","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:21:49.488373+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2eaee58-05c7-45cc-bb77-1db4c860a1a9', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ivan.rog.robert@gmail.com","user_id":"39761db4-8f2d-4281-add3-4bfc65495978","user_phone":""}}', '2023-12-24 21:33:01.018909+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9deb4dc-f7e3-4375-b219-4390cfc60be7', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:35:10.636847+00', ''),
	('00000000-0000-0000-0000-000000000000', '1cb36983-96b3-40a4-80ae-6c01b98ffa17', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:35:11.687785+00', ''),
	('00000000-0000-0000-0000-000000000000', '752d15ec-e704-4810-89de-45b011fda34e', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:36:33.228864+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cd22d10-ab6b-44b0-91d1-5febb1004aaf', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:36:35.345899+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d8686ee-a494-4615-9653-6aa8eb2cdb57', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:36:36.126791+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb29f3f9-27de-40e1-b052-6d01a6a359c7', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:38:17.709995+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d32fc59-e8b1-43c9-b3fc-01a4ef690b70', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:38:18.640789+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e84aaaa3-bb06-4f7b-9f40-406a1bd1bc84', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:38:20.453174+00', ''),
	('00000000-0000-0000-0000-000000000000', '18288fb8-58a4-4a82-af57-8cb0c881d9d8', '{"action":"user_signedup","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-12-24 21:38:56.518662+00', ''),
	('00000000-0000-0000-0000-000000000000', '086b9bdd-abbb-47e7-89ae-0d4f79aaa5ac', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 21:38:56.520975+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b95b484f-f0da-4c35-a2fc-36dfd952dbe5', '{"action":"logout","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 21:39:07.235132+00', ''),
	('00000000-0000-0000-0000-000000000000', '25db88f2-8758-4ae9-a618-dc221a430c70', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 21:39:08.76999+00', ''),
	('00000000-0000-0000-0000-000000000000', '1afae716-cb3a-4358-8fe5-0467d969036f', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 21:39:29.269663+00', ''),
	('00000000-0000-0000-0000-000000000000', '6257ce5f-294f-4387-9981-e66422e12c50', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 21:45:15.085554+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b41e52a5-04aa-4573-81e3-c24125b62f6e', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 21:45:16.099713+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a61e573-7a0a-49bb-a0e1-ae979bd02ba1', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:45:31.48434+00', ''),
	('00000000-0000-0000-0000-000000000000', '8314b0d6-9842-4b45-a2ac-c06185bc8dac', '{"action":"user_repeated_signup","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-12-24 21:45:33.058149+00', ''),
	('00000000-0000-0000-0000-000000000000', '49416763-66cb-45ca-89a8-f29c6d103107', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-24 21:46:49.115838+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a117e2e8-9e0f-4161-8f68-fcc64abf056f', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-24 21:46:49.985778+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed94115b-8202-4859-aaf7-97092934b9eb', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:34:06.360249+00', ''),
	('00000000-0000-0000-0000-000000000000', '66f256cd-cd5d-42a4-8916-57e875f4cd38', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:35:45.5153+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e53f3ff-4156-4bee-b02e-f2ac92b73675', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:36:29.069253+00', ''),
	('00000000-0000-0000-0000-000000000000', '83956426-0859-4b9d-b5d5-de41acb583e7', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:38:08.846088+00', ''),
	('00000000-0000-0000-0000-000000000000', '1258c04c-a7e3-474d-8450-d6e441185de9', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:40:42.42365+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a53dc145-c7e9-4930-b79e-16d23975f2a4', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:44:18.763083+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee304d39-53db-4573-8661-0ced477f13bd', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:45:25.93729+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f59bf9e-302a-423b-bc45-3508f10e1705', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:46:04.706592+00', ''),
	('00000000-0000-0000-0000-000000000000', '64d263f1-a593-4a11-a531-80ada8b826e6', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:46:38.660508+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc4f6ba6-57e0-4cff-bc14-a9156759a78c', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:52:13.759403+00', ''),
	('00000000-0000-0000-0000-000000000000', '32278a8a-1817-40c1-86ed-cc869764a517', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:54:07.338414+00', ''),
	('00000000-0000-0000-0000-000000000000', '97b0e527-df39-41e3-a9c3-d603ee470279', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:54:15.53665+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6a007aa-9a96-4871-9866-401bc00841b6', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 20:54:41.498373+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e08ceee-8ac2-47e1-bcd1-26245376ce3b', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:05:59.765981+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c410f5dd-9030-4185-9b39-6ee38e6f34c7', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:06:57.449381+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cbe94f64-2cb0-4e54-8e24-6a4333693f9f', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:13:08.158656+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8411319-9bd4-4470-8ba3-6694632ea825', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:14:57.051068+00', ''),
	('00000000-0000-0000-0000-000000000000', '15d4c0df-8702-413c-860e-344da76f6262', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:21:03.152492+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e66d758a-9e4c-4e3b-b7c1-f7985aece801', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:22:37.136998+00', ''),
	('00000000-0000-0000-0000-000000000000', '78d5137f-b641-4082-b79d-bdac90c4c000', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:23:13.911383+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d5086b8-4b7c-48a6-be6d-ba5cea42179e', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:23:23.193935+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd95d09e4-0f6e-407b-b467-25e9fec0b0f7', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:24:43.701277+00', ''),
	('00000000-0000-0000-0000-000000000000', '029d9120-ca2c-47da-8d59-cf5aa870b7d3', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:28:19.459393+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc8d3153-2278-4b17-9a82-7eedaab5fee6', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:29:56.063413+00', ''),
	('00000000-0000-0000-0000-000000000000', '92bb7db4-356e-43aa-bb80-3d7131a0a732', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:44:44.028521+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dae4916b-c904-4918-b860-7dc621e4fde6', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:45:25.497052+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7267d23-6b39-466d-ac78-b7e195bd16e9', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:47:57.558072+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fadb92f9-c598-4a32-a8b4-ba429a9aecc3', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:49:36.643371+00', ''),
	('00000000-0000-0000-0000-000000000000', '54bce73b-fc77-4cb7-91c7-b90f2c622d4a', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:49:56.045373+00', ''),
	('00000000-0000-0000-0000-000000000000', '79dee192-6193-4e1d-ad01-d547510a8371', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:58:43.457466+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6a42004-c2fb-4148-916b-1d2215397fb2', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:59:37.412926+00', ''),
	('00000000-0000-0000-0000-000000000000', '00f32c97-0359-49ec-8b14-e84a06d45075', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-26 23:59:48.040565+00', ''),
	('00000000-0000-0000-0000-000000000000', '6843ef9e-2410-4099-b930-fa8ff682058f', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 00:02:12.493834+00', ''),
	('00000000-0000-0000-0000-000000000000', '51391509-d627-4ef7-b8f2-4a4baa6077b5', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 00:33:28.157965+00', ''),
	('00000000-0000-0000-0000-000000000000', '1115f301-b7a6-4996-81be-9ebab496e938', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 00:34:23.079726+00', ''),
	('00000000-0000-0000-0000-000000000000', '011c75b7-93aa-4948-998e-3ac19531168a', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 00:36:46.493405+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac50f4ac-3098-44f7-ba73-43a49d858a0d', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 00:57:19.40397+00', ''),
	('00000000-0000-0000-0000-000000000000', '8aa42642-e65b-489b-9011-17620b86ddd1', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 01:17:53.041063+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d045125-fa7a-47aa-9871-7ceb8f16e5c6', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 17:54:40.361095+00', ''),
	('00000000-0000-0000-0000-000000000000', '07b57456-a4a6-4bcc-82c7-98bbbea6c02d', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 18:26:15.271865+00', ''),
	('00000000-0000-0000-0000-000000000000', '1493e732-1850-4cb2-9ca2-e50a1188b0fa', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-27 18:26:54.282454+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2727148-64ac-4ac3-b353-a1d1c69df0b0', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-28 00:57:43.638881+00', ''),
	('00000000-0000-0000-0000-000000000000', '52d71d20-a2e9-4545-b482-53910a2d8db0', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-28 22:44:06.085969+00', ''),
	('00000000-0000-0000-0000-000000000000', '30c120f0-0e78-4ebc-aaf7-e25fec9e1460', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-28 22:44:21.166114+00', ''),
	('00000000-0000-0000-0000-000000000000', '77d45249-ec55-4094-b5d3-33d78d898a94', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-28 22:44:26.76486+00', ''),
	('00000000-0000-0000-0000-000000000000', '31fb4bc3-90ae-45b5-a1d6-9554c844dda1', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-28 23:42:51.290685+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b91058eb-12e0-404b-b796-c7c0af3db3bb', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-28 23:42:51.291244+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d1639bf-e891-468e-b282-aff23597a5ea', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 00:54:23.628985+00', ''),
	('00000000-0000-0000-0000-000000000000', '7134d235-5a66-48a2-87bc-46ed3f610717', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 00:54:23.629522+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd183aad4-5fcf-42eb-8e44-b034abd29772', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 01:52:50.754124+00', ''),
	('00000000-0000-0000-0000-000000000000', '4060edb0-07c6-4073-b59c-b941de7f5112', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 01:52:50.755962+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e734017-0dff-4acf-84b5-490e0d2a1b9e', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 02:53:50.932571+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f4f6c33-1073-436b-8325-3354f9f23a19', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 02:53:50.93397+00', ''),
	('00000000-0000-0000-0000-000000000000', '6df4a0b8-5dd4-4a56-a716-6afeaea9eca4', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 03:54:53.800613+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0820950-ce36-4c2d-babe-521410382626', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 03:54:53.802814+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd78954d6-e7c7-4a35-820e-b1a99664934b', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 04:56:10.454352+00', ''),
	('00000000-0000-0000-0000-000000000000', '8411d115-f32b-44bb-99a4-46223dd5bdbc', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 04:56:10.45493+00', ''),
	('00000000-0000-0000-0000-000000000000', '55c7e3c0-ee8c-40fb-9daa-f0560bb75e07', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 05:56:56.188324+00', ''),
	('00000000-0000-0000-0000-000000000000', '26ca30ba-2038-4338-9e3f-98a99d911469', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 05:56:56.190718+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cd63304-6dc3-41f2-94c0-d8140ccf3445', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 06:58:12.569563+00', ''),
	('00000000-0000-0000-0000-000000000000', '210e6a45-d77e-45b7-a440-5ade0c26492f', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 06:58:12.570664+00', ''),
	('00000000-0000-0000-0000-000000000000', '79db665e-89f6-4be7-84bf-824db130267c', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 07:58:58.399719+00', ''),
	('00000000-0000-0000-0000-000000000000', '0256e864-62bd-4336-a333-756998dfc177', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 07:58:58.400354+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c4a3405-abd1-46fb-8c3d-ec886e7f8746', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 08:58:33.614814+00', ''),
	('00000000-0000-0000-0000-000000000000', '90230c34-aed4-4d4d-9a0d-6d5e6fbf8e22', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 08:58:33.61537+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ecb0c19-6fb2-40f9-a459-cca8fd50e129', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 09:59:00.130443+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7c7b61a-26af-4f01-ba0d-7afa64bd99f2', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 09:59:00.131033+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd928ce0f-8dcc-4c24-89c4-f77c2d825f65', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 11:00:00.052731+00', ''),
	('00000000-0000-0000-0000-000000000000', '52092387-3a2c-4325-bad0-fc8491012679', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 11:00:00.053909+00', ''),
	('00000000-0000-0000-0000-000000000000', '922f6a77-410c-4f97-99f5-4de85bf093bb', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 12:09:50.120668+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ee22721-f715-4823-90f5-bdc9f4a1fc53', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 12:09:50.122485+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e9b5524-519d-4ac0-8623-29b2e7c848d7', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 13:20:47.276193+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc792cfc-9228-49ba-96c1-1adce7679db9', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 13:20:47.277209+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a832df74-be89-4ca4-8b07-af62b2070721', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 14:19:32.838951+00', ''),
	('00000000-0000-0000-0000-000000000000', '556486f4-4b0e-4cde-9e59-a78d94b0561b', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 14:19:32.839499+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec59f860-bf32-4f25-b567-589cbc5fc32a', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 15:21:51.67565+00', ''),
	('00000000-0000-0000-0000-000000000000', '720ad473-16f2-4896-9c22-56216ce3ef31', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 15:21:51.677352+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ed900f3-ab70-4f83-b76f-98aa1cd4b8ba', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 16:23:41.512918+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5f97d29-0a96-416b-8af4-3ef8cc46d274', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 16:23:41.513505+00', ''),
	('00000000-0000-0000-0000-000000000000', '94d53c85-bfa6-4733-ba14-a4cce24d8f79', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 17:22:09.700654+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab623b77-155c-47f6-bad3-b8943d3b2d86', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 17:22:09.702553+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffe0d13c-2ce8-4e82-bad6-1cabc83c870d', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 19:20:04.001637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c080b2c2-619d-4827-b551-57702b23b01d', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 19:20:04.002953+00', ''),
	('00000000-0000-0000-0000-000000000000', '08b90470-275f-498d-a2f6-f02897a802ff', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 20:37:45.847649+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b141a6e-0ef7-49a6-9ce9-f42f803a6e2a', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 20:37:45.848202+00', ''),
	('00000000-0000-0000-0000-000000000000', '07720044-16b8-4df2-ae4e-802e172876c3', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 21:54:13.43271+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f73e845-34e6-4d35-a00f-44dbc20db7c2', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-29 21:54:13.434226+00', ''),
	('00000000-0000-0000-0000-000000000000', '837e2e20-7a5f-4292-acc6-c5822a942841', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-30 07:54:36.535805+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8e1265b-f97e-44ed-b7ae-a96a52307902', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-30 07:54:36.538006+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af0ee1c5-7bdc-41ae-b3cb-84c0a5b6f77d', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 10:54:41.984211+00', ''),
	('00000000-0000-0000-0000-000000000000', '84d5abe1-b9ca-4fbd-874f-48d6063ea9dd', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 10:57:07.984677+00', ''),
	('00000000-0000-0000-0000-000000000000', '73615686-60c3-4d95-8b99-dc1b0860b3ea', '{"action":"token_refreshed","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-30 11:01:56.659075+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c99b452d-2c54-4f67-9e27-728fa925d1d2', '{"action":"token_revoked","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-12-30 11:01:56.660368+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e80706ca-e561-465a-941c-c5650f0c9b31', '{"action":"logout","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-30 11:02:34.667451+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef42ecff-3c6c-4257-a34e-44e93dd59652', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 11:02:37.723125+00', ''),
	('00000000-0000-0000-0000-000000000000', '754e3d48-4eff-4403-918c-052e5b0516ce', '{"action":"logout","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-30 11:17:59.035276+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b310a49-2496-43c2-b806-1139acee3126', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 11:18:21.496166+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bdfe967-fc46-4596-809a-73df91fb8acd', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 11:30:09.376533+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6ac5ad8-5345-43c1-9b72-24beaf469865', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 11:30:37.849156+00', ''),
	('00000000-0000-0000-0000-000000000000', '59fd6afd-1692-4373-817a-cc17096f2922', '{"action":"login","actor_id":"16ada27d-d170-4228-9e04-7139ea14ee8c","actor_username":"ivan.r.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-12-30 11:31:03.805619+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5a7a6e9-4652-434a-950d-cbae3ecd438f', '{"action":"logout","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-12-30 11:34:48.43037+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e35b590f-f75c-4be3-b131-82c316afcab8', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-02 10:43:58.8193+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8439f18-e93c-435c-af37-611522ed8949', '{"action":"logout","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-01-02 10:44:54.161143+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a852bb1-3fa2-4a40-b5c8-b32f638d7041', '{"action":"user_repeated_signup","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-01-02 13:18:26.370184+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea8731b7-41e6-4028-b671-68b010677410', '{"action":"login","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-02 13:20:30.169405+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7e2aae4-b34e-453f-9487-3657b1a41123', '{"action":"token_refreshed","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-02 14:18:48.318328+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd363d0b-9180-4c28-bc67-246e49213b1b', '{"action":"token_revoked","actor_id":"8d2c7857-95aa-45c3-92e0-e5ae73848335","actor_username":"ivan.rog.robert@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-02 14:18:48.318885+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '16ada27d-d170-4228-9e04-7139ea14ee8c', 'authenticated', 'authenticated', 'ivan.r.robert@gmail.com', '$2a$10$FCpGZjvt/sM.bwNiFU5tWuZDnUXhmSENah7/QA8JmQS70fqTg4I1u', '2023-12-24 16:34:31.729751+00', NULL, '', '2023-12-24 16:34:18.000642+00', '', NULL, '', '', NULL, '2023-12-30 11:31:03.806222+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-12-24 16:34:17.996637+00', '2023-12-30 11:31:03.807724+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '8d2c7857-95aa-45c3-92e0-e5ae73848335', 'authenticated', 'authenticated', 'ivan.rog.robert@gmail.com', '$2a$10$J/HFv4vP.b16M2p5ifzuF.H3MYS.sTjdEELuDu6nCj2TGqVsr9owS', '2023-12-24 21:38:56.519118+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-01-02 13:20:30.169995+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-12-24 21:38:56.515252+00', '2024-01-02 14:18:48.321139+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('16ada27d-d170-4228-9e04-7139ea14ee8c', '16ada27d-d170-4228-9e04-7139ea14ee8c', '{"sub": "16ada27d-d170-4228-9e04-7139ea14ee8c", "email": "ivan.r.robert@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-12-24 16:34:17.999165+00', '2023-12-24 16:34:17.999211+00', '2023-12-24 16:34:17.999211+00', '16525826-7dd6-4072-bf5e-18fc3beeb356'),
	('8d2c7857-95aa-45c3-92e0-e5ae73848335', '8d2c7857-95aa-45c3-92e0-e5ae73848335', '{"sub": "8d2c7857-95aa-45c3-92e0-e5ae73848335", "email": "ivan.rog.robert@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-12-24 21:38:56.517773+00', '2023-12-24 21:38:56.517827+00', '2023-12-24 21:38:56.517827+00', 'd15787f5-28bd-43b2-9688-869a830e71fe');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('81179bd6-263b-4b2a-966f-b7500c32871a', '16ada27d-d170-4228-9e04-7139ea14ee8c', '2023-12-30 11:30:09.377129+00', '2023-12-30 11:30:09.377129+00', NULL, 'aal1', NULL, NULL, 'Bun/1.0.15', '77.205.21.54', NULL),
	('9be146e1-1117-4017-8618-a8e6e0f574b4', '16ada27d-d170-4228-9e04-7139ea14ee8c', '2023-12-30 11:30:37.84976+00', '2023-12-30 11:30:37.84976+00', NULL, 'aal1', NULL, NULL, 'Bun/1.0.15', '77.205.21.54', NULL),
	('92efd614-9225-4f13-a559-0fb99e316152', '16ada27d-d170-4228-9e04-7139ea14ee8c', '2023-12-30 11:31:03.806303+00', '2023-12-30 11:31:03.806303+00', NULL, 'aal1', NULL, NULL, 'Bun/1.0.15', '77.205.21.54', NULL),
	('9b6a544a-dfd0-4e5c-99b0-decffd677221', '8d2c7857-95aa-45c3-92e0-e5ae73848335', '2024-01-02 13:20:30.17007+00', '2024-01-02 14:18:48.323666+00', NULL, 'aal1', NULL, '2024-01-02 14:18:48.323592', 'ChadGPT/1 CFNetwork/1474 Darwin/23.1.0', '89.86.179.153', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('81179bd6-263b-4b2a-966f-b7500c32871a', '2023-12-30 11:30:09.37949+00', '2023-12-30 11:30:09.37949+00', 'password', '0a19f285-456b-4aeb-9a25-43490a80ab96'),
	('9be146e1-1117-4017-8618-a8e6e0f574b4', '2023-12-30 11:30:37.851432+00', '2023-12-30 11:30:37.851432+00', 'password', '9c7d999e-6e57-414e-b3fb-f721408d4a2e'),
	('92efd614-9225-4f13-a559-0fb99e316152', '2023-12-30 11:31:03.807976+00', '2023-12-30 11:31:03.807976+00', 'password', '3e7ff218-0faf-4418-8aff-31f40cf90351'),
	('9b6a544a-dfd0-4e5c-99b0-decffd677221', '2024-01-02 13:20:30.173729+00', '2024-01-02 13:20:30.173729+00', 'password', 'ee8f3b59-b293-42dd-bc7c-188837d70d37');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 100, 'QAvCHCriLmz1IzmD5czGkg', '16ada27d-d170-4228-9e04-7139ea14ee8c', false, '2023-12-30 11:30:09.377865+00', '2023-12-30 11:30:09.377865+00', NULL, '81179bd6-263b-4b2a-966f-b7500c32871a'),
	('00000000-0000-0000-0000-000000000000', 101, 'MHQlWKdlYuaeR4fAac-Z6Q', '16ada27d-d170-4228-9e04-7139ea14ee8c', false, '2023-12-30 11:30:37.850296+00', '2023-12-30 11:30:37.850296+00', NULL, '9be146e1-1117-4017-8618-a8e6e0f574b4'),
	('00000000-0000-0000-0000-000000000000', 102, '9iV1pjo22o2t32YAPgFDlA', '16ada27d-d170-4228-9e04-7139ea14ee8c', false, '2023-12-30 11:31:03.806883+00', '2023-12-30 11:31:03.806883+00', NULL, '92efd614-9225-4f13-a559-0fb99e316152'),
	('00000000-0000-0000-0000-000000000000', 104, 'FiYsOjbOLJjV-FKRkA_Kjg', '8d2c7857-95aa-45c3-92e0-e5ae73848335', true, '2024-01-02 13:20:30.17264+00', '2024-01-02 14:18:48.320026+00', NULL, '9b6a544a-dfd0-4e5c-99b0-decffd677221'),
	('00000000-0000-0000-0000-000000000000', 105, '-undYnDvTqMu2sEDlFDnSQ', '8d2c7857-95aa-45c3-92e0-e5ae73848335', false, '2024-01-02 14:18:48.320374+00', '2024-01-02 14:18:48.320374+00', 'FiYsOjbOLJjV-FKRkA_Kjg', '9b6a544a-dfd0-4e5c-99b0-decffd677221');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: exos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."exos" ("exo_id", "is_official", "added_by", "description", "exo_type", "exo_nom") VALUES
	('eb43ccf5-e0d3-4502-91d8-533b647b0a41', false, '8d2c7857-95aa-45c3-92e0-e5ae73848335', 'here is the full description', 'reps', 'unofficial_exo'),
	('f7e45c3a-9762-41de-9a38-824d708fb88e', true, '8d2c7857-95aa-45c3-92e0-e5ae73848335', 'hello this is official', 'poids', 'official_exo');


--
-- Data for Name: exos_muscles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."exos_muscles" ("exo_id", "muscle_id", "engagement_level") VALUES
	('eb43ccf5-e0d3-4502-91d8-533b647b0a41', '292d5ffe-ad6c-40a1-8bf7-7eb213dfd666', 0.6);


--
-- Data for Name: muscles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."muscles" ("muscle_name", "muscle_id") VALUES
	('pecs', '292d5ffe-ad6c-40a1-8bf7-7eb213dfd666');


--
-- Data for Name: salles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."salles" ("salle_id", "salle_nom") VALUES
	('8aed3f49-24c9-41eb-98c7-3e8d11bb03a5', 'Basic fit');


--
-- Data for Name: seances; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."seances" ("seance_id", "user_id", "start_date", "seance_types", "salle_id", "end_date") VALUES
	('bbbeb323-b0c2-46c4-92f8-0ddf1c794f50', '8d2c7857-95aa-45c3-92e0-e5ae73848335', '2002-06-30 18:20:20+00', '{dos,épaules,bras}', '8aed3f49-24c9-41eb-98c7-3e8d11bb03a5', '2002-06-30 19:21:21+00');


--
-- Data for Name: perfs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."perfs" ("perf_id", "seance_id", "exo_id") VALUES
	('93e1c09c-3678-4efd-9d45-f338fde68095', 'bbbeb323-b0c2-46c4-92f8-0ddf1c794f50', 'f7e45c3a-9762-41de-9a38-824d708fb88e');


--
-- Data for Name: series_poids; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: series_temps; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 105, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
