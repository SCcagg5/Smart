-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : Dim 09 août 2020 à 10:50
-- Version du serveur :  5.7.29
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `smartdom`
--

--
-- Déchargement des données de la table `ged`
--

INSERT INTO `ged` (`id`, `name`, `user_id`, `date`) VALUES
('896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9', 'test', '6aecda5d-9b51-4fb7-a5ce-052aa75a9d54', '1596964945890');

--
-- Déchargement des données de la table `ged_user`
--

INSERT INTO `ged_user` (`id`, `ged_id`, `user_id`, `role`, `shared_by`, `date`) VALUES
('896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf8', '896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9', '6aecda5d-9b51-4fb7-a5ce-052aa75a9d54', 1, '6aecda5d-9b51-4fb7-a5ce-052aa75a9d54', '1596964945890');

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `role`, `email`, `password`, `date`) VALUES
('6aecda5d-9b51-4fb7-a5ce-052aa75a9d54', 0, 'test@test.fr', '162425e7495b1ba0d3e174b1880752cad98a2ff53fbab44e853599cd5cf4fc28cf4c1bd5fc6369c54b73e9a5d9c4396711053910dfa1d72ff1602cb8570e3803', '1596964945890');

--
-- Déchargement des données de la table `wallet`
--

INSERT INTO `wallet` (`id`, `user_id`, `adresse`, `mnemonic`) VALUES
('5596129f-1b50-4105-bc77-bb2ae8ac144b', '896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9', '0xC1941392f627917bd1673cb0c9DbC9De6cF496d8', 'spice eye tool exile utility media lazy must typical cat volume nasty');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
