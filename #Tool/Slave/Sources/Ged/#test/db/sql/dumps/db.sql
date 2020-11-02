-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : jeu. 29 oct. 2020 à 09:13
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ged`
--

-- --------------------------------------------------------

--
-- Structure de la table `ged`
--

CREATE TABLE `ged` (
  `id` varchar(40) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `date` varchar(30) NOT NULL,
  `b64` longtext,
  `start` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ged`
--

INSERT INTO `ged` (`id`, `name`, `date`, `b64`, `start`) VALUES
('896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9', NULL, '1603900370797', NULL, '1603919568040');

-- --------------------------------------------------------

--
-- Structure de la table `ged_file`
--

CREATE TABLE `ged_file` (
  `id` varchar(38) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(127) NOT NULL,
  `type` varchar(20) NOT NULL,
  `inside` varchar(36) DEFAULT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ged_folder`
--

CREATE TABLE `ged_folder` (
  `id` varchar(38) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(127) NOT NULL,
  `inside` varchar(36) DEFAULT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ged_option`
--

CREATE TABLE `ged_option` (
  `id` varchar(40) NOT NULL,
  `smtp` tinyint(4) NOT NULL DEFAULT '0',
  `smtp_opt` text,
  `odoo` tinyint(4) NOT NULL DEFAULT '0',
  `odoo_opt` text,
  `room` tinyint(4) NOT NULL DEFAULT '0',
  `room_opt` text,
  `open` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ged_option`
--

INSERT INTO `ged_option` (`id`, `smtp`, `smtp_opt`, `odoo`, `odoo_opt`, `room`, `room_opt`, `open`) VALUES
('', 0, NULL, 1, '{\"url\":\"http://91.121.162.202:10013\",\"username\":\"eliot.courtel@gmail.com\",\"db\":\"odoo\",\"password\":\"test\"}', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `ged_share_file`
--

CREATE TABLE `ged_share_file` (
  `id` varchar(40) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `file_id` varchar(40) NOT NULL,
  `can_administrate` tinyint(1) NOT NULL,
  `can_share` tinyint(1) NOT NULL,
  `can_edit` tinyint(1) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `date` varchar(20) NOT NULL,
  `shared_by` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ged_share_file_buff`
--

CREATE TABLE `ged_share_file_buff` (
  `id` varchar(40) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `file_id` varchar(40) NOT NULL,
  `can_administrate` tinyint(1) NOT NULL,
  `can_share` tinyint(1) NOT NULL,
  `can_edit` tinyint(1) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `date` varchar(20) NOT NULL,
  `shared_by` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ged_share_folder`
--

CREATE TABLE `ged_share_folder` (
  `id` varchar(40) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `folder_id` varchar(40) NOT NULL,
  `can_administrate` tinyint(1) NOT NULL,
  `can_share` tinyint(1) NOT NULL,
  `can_edit` tinyint(1) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `date` varchar(20) NOT NULL,
  `shared_by` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ged_share_folder_buff`
--

CREATE TABLE `ged_share_folder_buff` (
  `id` varchar(40) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `folder_id` varchar(40) NOT NULL,
  `can_administrate` tinyint(1) NOT NULL,
  `can_share` tinyint(1) NOT NULL,
  `can_edit` tinyint(1) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `date` varchar(20) NOT NULL,
  `shared_by` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `odoo_case`
--

CREATE TABLE `odoo_case` (
  `id` varchar(40) NOT NULL,
  `ged_id` varchar(40) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `client_id` varchar(40) NOT NULL,
  `name` varchar(60) NOT NULL,
  `type` varchar(30) NOT NULL,
  `team` mediumtext NOT NULL,
  `folder_id` varchar(40) NOT NULL,
  `date` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ged`
--
ALTER TABLE `ged`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_file`
--
ALTER TABLE `ged_file`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_folder`
--
ALTER TABLE `ged_folder`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_option`
--
ALTER TABLE `ged_option`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ged_share_file`
--
ALTER TABLE `ged_share_file`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_share_file_buff`
--
ALTER TABLE `ged_share_file_buff`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_share_folder`
--
ALTER TABLE `ged_share_folder`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `ged_share_folder_buff`
--
ALTER TABLE `ged_share_folder_buff`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `odoo_case`
--
ALTER TABLE `odoo_case`
  ADD UNIQUE KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
