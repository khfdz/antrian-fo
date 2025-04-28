-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 10:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `antrian_fo`
--

-- --------------------------------------------------------

--
-- Table structure for table `antrian`
--

CREATE TABLE `antrian` (
  `id` int(11) NOT NULL,
  `nomor_antrian` varchar(100) NOT NULL,
  `departemen_id` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'belum dipanggil',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `loket_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `antrian`
--

INSERT INTO `antrian` (`id`, `nomor_antrian`, `departemen_id`, `status`, `created_at`, `loket_id`) VALUES
(1, 'D 1', 'D', 'sudah dipanggil', '2025-04-28 04:48:15', '1'),
(2, 'D 2', 'D', 'sudah dipanggil', '2025-04-28 04:48:17', '3'),
(3, 'D 3', 'D', 'belum dipanggil', '2025-04-28 04:48:18', NULL),
(4, 'D 4', 'D', 'belum dipanggil', '2025-04-28 04:48:20', NULL),
(5, 'D 5', 'D', 'belum dipanggil', '2025-04-28 04:48:21', NULL),
(6, 'A 1', 'A', 'belum dipanggil', '2025-04-28 04:48:27', NULL),
(7, 'A 2', 'A', 'belum dipanggil', '2025-04-28 04:48:28', NULL),
(8, 'A 3', 'A', 'belum dipanggil', '2025-04-28 04:48:29', NULL),
(9, 'A 4', 'A', 'belum dipanggil', '2025-04-28 04:48:31', NULL),
(10, 'B 1', 'B', 'belum dipanggil', '2025-04-28 04:48:37', NULL),
(11, 'B 2', 'B', 'belum dipanggil', '2025-04-28 04:48:38', NULL),
(12, 'B 3', 'B', 'sudah dipanggil', '2025-04-28 04:48:39', '4'),
(13, 'B 4', 'B', 'belum dipanggil', '2025-04-28 04:48:41', NULL),
(14, 'C 1', 'C', 'belum dipanggil', '2025-04-28 04:48:46', NULL),
(15, 'C 2', 'C', 'belum dipanggil', '2025-04-28 04:48:47', NULL),
(16, 'C 3', 'C', 'belum dipanggil', '2025-04-28 04:48:48', NULL),
(17, 'C 4', 'C', 'belum dipanggil', '2025-04-28 04:48:50', NULL),
(18, 'D 6', 'D', 'belum dipanggil', '2025-04-28 04:48:55', NULL),
(19, 'D 7', 'D', 'belum dipanggil', '2025-04-28 06:43:44', NULL),
(20, 'D 8', 'D', 'belum dipanggil', '2025-04-28 06:43:46', NULL),
(21, 'D 9', 'D', 'belum dipanggil', '2025-04-28 06:45:10', NULL),
(22, 'D 10', 'D', 'belum dipanggil', '2025-04-28 06:45:12', NULL),
(23, 'D 11', 'D', 'belum dipanggil', '2025-04-28 07:45:37', NULL),
(24, '12 D', 'D', 'sudah dipanggil', '2025-04-28 08:24:56', '4');

-- --------------------------------------------------------

--
-- Table structure for table `antrian_counter`
--

CREATE TABLE `antrian_counter` (
  `id` varchar(50) NOT NULL,
  `nomor_terakhir` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `antrian_counter`
--

INSERT INTO `antrian_counter` (`id`, `nomor_terakhir`) VALUES
('A', 4),
('B', 4),
('C', 4),
('D', 12);

-- --------------------------------------------------------

--
-- Table structure for table `departemen`
--

CREATE TABLE `departemen` (
  `id` varchar(50) NOT NULL,
  `nama_departemen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departemen`
--

INSERT INTO `departemen` (`id`, `nama_departemen`) VALUES
('A', 'Tunai'),
('B', 'Asuransi'),
('C', 'Perusahaan'),
('D', 'BPJS');

-- --------------------------------------------------------

--
-- Table structure for table `loket`
--

CREATE TABLE `loket` (
  `id` varchar(50) NOT NULL,
  `nama_loket` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loket`
--

INSERT INTO `loket` (`id`, `nama_loket`) VALUES
('1', 'A'),
('2', 'B'),
('3', 'C'),
('4', 'D');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antrian`
--
ALTER TABLE `antrian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departemen_id` (`departemen_id`),
  ADD KEY `fk_loket_id` (`loket_id`);

--
-- Indexes for table `antrian_counter`
--
ALTER TABLE `antrian_counter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departemen`
--
ALTER TABLE `departemen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loket`
--
ALTER TABLE `loket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antrian`
--
ALTER TABLE `antrian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `antrian`
--
ALTER TABLE `antrian`
  ADD CONSTRAINT `antrian_ibfk_1` FOREIGN KEY (`departemen_id`) REFERENCES `departemen` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_loket_id` FOREIGN KEY (`loket_id`) REFERENCES `loket` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `antrian_counter`
--
ALTER TABLE `antrian_counter`
  ADD CONSTRAINT `antrian_counter_ibfk_1` FOREIGN KEY (`id`) REFERENCES `departemen` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
