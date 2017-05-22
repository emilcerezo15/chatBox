-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.5-10.1.19-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for chatbox_db
CREATE DATABASE IF NOT EXISTS `chatbox_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `chatbox_db`;


-- Dumping structure for table chatbox_db.tbl_message
CREATE TABLE IF NOT EXISTS `tbl_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thread_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '0 = seen, 1 = unseen',
  `body` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=latin1;

-- Dumping data for table chatbox_db.tbl_message: ~16 rows (approximately)
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
INSERT INTO `tbl_message` (`id`, `thread_id`, `sender_id`, `status`, `body`, `created_at`, `updated_at`) VALUES
	(1, 1, 3, 0, 'Hi', '2017-04-04 09:47:46', '2017-04-07 08:42:44'),
	(2, 1, 1, 0, 'Hello', '2017-04-04 09:53:43', '2017-04-10 02:43:00'),
	(3, 1, 3, 0, 'KAmusta?', '2017-04-04 09:54:38', '2017-04-07 08:42:46'),
	(4, 2, 2, 0, 'Harold..', '2017-04-04 13:49:01', '2017-04-10 23:35:33'),
	(5, 2, 2, 0, 'Where are you?', '2017-04-04 13:49:16', '2017-04-10 23:35:33'),
	(6, 2, 1, 0, 'At tektite', '2017-04-04 13:49:20', '2017-04-10 08:10:52'),
	(70, 5, 1, 0, 'Hi joseph', '2017-04-10 00:34:57', '2017-04-10 02:48:07'),
	(110, 10, 4, 0, 'hi', '2017-04-10 07:11:50', '2017-04-10 08:10:31'),
	(111, 10, 2, 0, 'hello', '2017-04-10 07:12:01', '2017-04-10 07:12:32'),
	(112, 10, 4, 0, 'hi', '2017-04-10 07:12:26', '2017-04-10 08:10:31'),
	(113, 10, 4, 0, 'hello', '2017-04-10 07:12:35', '2017-04-10 08:10:31'),
	(114, 10, 2, 1, 'hi', '2017-04-10 08:10:33', '2017-04-10 08:10:33'),
	(115, 2, 2, 0, 'hi', '2017-04-10 08:10:40', '2017-04-10 23:35:33'),
	(116, 2, 1, 0, 'hi', '2017-04-10 08:10:49', '2017-04-10 08:10:52'),
	(117, 2, 1, 1, 'hi', '2017-04-10 23:35:35', '2017-04-10 23:35:35'),
	(118, 12, 1, 1, 'hi', '2017-04-10 23:35:41', '2017-04-10 23:35:41');
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;


-- Dumping structure for table chatbox_db.tbl_thread
CREATE TABLE IF NOT EXISTS `tbl_thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) DEFAULT NULL,
  `createdBy_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table chatbox_db.tbl_thread: ~6 rows (approximately)
/*!40000 ALTER TABLE `tbl_thread` DISABLE KEYS */;
INSERT INTO `tbl_thread` (`id`, `sender_id`, `createdBy_id`, `created_at`, `updated_at`) VALUES
	(1, 3, 1, '2017-04-04 09:47:30', '2017-04-04 15:26:52'),
	(2, 2, 1, '2017-04-04 13:47:35', '2017-04-04 15:26:52'),
	(3, 3, 2, '2017-04-04 07:26:58', '2017-04-04 07:26:58'),
	(10, 2, 4, '2017-04-10 07:11:47', '2017-04-10 07:11:47'),
	(11, 5, 1, '2017-04-10 23:35:37', '2017-04-10 23:35:37'),
	(12, 6, 1, '2017-04-10 23:35:38', '2017-04-10 23:35:38');
/*!40000 ALTER TABLE `tbl_thread` ENABLE KEYS */;


-- Dumping structure for table chatbox_db.tbl_users
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `status` int(1) DEFAULT '0' COMMENT '0 = offline; 1 = online',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remember_token` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table chatbox_db.tbl_users: ~6 rows (approximately)
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `created_at`, `updated_At`, `remember_token`) VALUES
	(1, 'harold', 'meachum', 'harold.meachum@gmail.com', '$2y$10$OQSWd0.CX0NCT99f0Ru8CeFT9M5BJig5oRIvmccfYXV2omEy5RfBa', 1, '2017-04-04 08:20:12', '2017-04-10 16:07:28', 'DfidHFGp9Twp0kRLfvNXzPWUtsFe4rW3ni9KFIIDBbHv3pqpz46ZlGaRiaxx'),
	(2, 'wendell', 'rand', 'wendell.rand@gmail.com', '$2y$10$OQSWd0.CX0NCT99f0Ru8CeFT9M5BJig5oRIvmccfYXV2omEy5RfBa', 1, '2017-04-04 08:20:12', '2017-04-10 16:06:03', 'Ylu7FXQVtKOTbvEWXGLDE1VTEsB4rKuPwlzl2JlGZ4o3WUAS9SNqSxlwWcjX'),
	(3, 'joy', 'meachum', 'joy.meachum@gmail.com', '$2y$10$OQSWd0.CX0NCT99f0Ru8CeFT9M5BJig5oRIvmccfYXV2omEy5RfBa', 0, '2017-04-04 08:22:59', '2017-04-10 07:41:09', 'BUPFZa2pO1fqTTqAir9tJDCHMovkyfZNYVvk2kIRC9E3GCYYSLztmeQbPdBH'),
	(4, 'Joseph', 'Fidelino', 'joseph.fidelino@republisys.com', '$2y$10$PH8nlnxV9AEBrfwypANY7OL4TMoPeXpkm2M/vGRaJdtnnYKpCrqHe', 1, '2017-04-05 00:35:55', '2017-04-10 16:05:21', 'TodNO1kB9m0IRttmpL7qlmSBnCfXTvcaS2YOnrUYZj0L823pR3kPdJmEywaB'),
	(5, 'Daniel', 'Rand', 'daniel.rand@gmail.com', '$2y$10$80sSQv3G10EAW3ZtHMqOS.O5cmuV/jtdlMBedE.hGBdarLDwNQE52', 0, '2017-04-05 02:19:36', '2017-04-10 07:41:10', 'tJvYXNVPev4rxjJGlBAE15enSMBiY1DSsVtBWmOicZgEx0lJn2K58nRmrQlU'),
	(6, 'Colleen', 'Wing', 'colleen.wing@gmail.com', '$2y$10$80sSQv3G10EAW3ZtHMqOS.O5cmuV/jtdlMBedE.hGBdarLDwNQE52', 1, '2017-04-05 02:19:36', '2017-04-10 23:34:29', 'tJvYXNVPev4rxjJGlBAE15enSMBiY1DSsVtBWmOicZgEx0lJn2K58nRmrQlU');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
