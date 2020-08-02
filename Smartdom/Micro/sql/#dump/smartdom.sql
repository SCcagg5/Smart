-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : Dim 02 août 2020 à 10:02
-- Version du serveur :  5.7.30
-- Version de PHP : 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `smartdom`
--

-- --------------------------------------------------------

--
-- Structure de la table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `asset_id` varchar(36) NOT NULL,
  `asset_name` varchar(60) NOT NULL,
  `token_val` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `order_id` varchar(36) DEFAULT NULL,
  `pay_id` varchar(36) DEFAULT NULL,
  `date` varchar(15) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `file`
--

CREATE TABLE `file` (
  `id` varchar(38) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(127) NOT NULL,
  `type` varchar(20) NOT NULL,
  `inside` varchar(36) DEFAULT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `folder`
--

CREATE TABLE `folder` (
  `id` varchar(38) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(127) NOT NULL,
  `inside` varchar(36) DEFAULT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `payment_id` varchar(64) NOT NULL,
  `date` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `paymentstripe`
--

CREATE TABLE `paymentstripe` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `chr_token` varchar(64) NOT NULL,
  `amount` float NOT NULL,
  `date` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `share_file`
--

CREATE TABLE `share_file` (
  `id` varchar(40) NOT NULL,
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
-- Structure de la table `share_file_buff`
--

CREATE TABLE `share_file_buff` (
  `id` varchar(40) NOT NULL,
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
-- Structure de la table `share_folder`
--

CREATE TABLE `share_folder` (
  `id` varchar(40) NOT NULL,
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
-- Structure de la table `share_folder_buff`
--

CREATE TABLE `share_folder_buff` (
  `id` varchar(40) NOT NULL,
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
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(512) NOT NULL,
  `date` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `userdetails`
--

CREATE TABLE `userdetails` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `userstripes`
--

CREATE TABLE `userstripes` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `stripe_id` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `wallet`
--

CREATE TABLE `wallet` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `adresse` varchar(128) NOT NULL,
  `mnemonic` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `file`
--
ALTER TABLE `file`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `folder`
--
ALTER TABLE `folder`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paymentstripe`
--
ALTER TABLE `paymentstripe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `share_file`
--
ALTER TABLE `share_file`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `share_file_buff`
--
ALTER TABLE `share_file_buff`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `share_folder`
--
ALTER TABLE `share_folder`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `share_folder_buff`
--
ALTER TABLE `share_folder_buff`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `userstripes`
--
ALTER TABLE `userstripes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paymentstripe`
--
ALTER TABLE `paymentstripe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `userstripes`
--
ALTER TABLE `userstripes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
