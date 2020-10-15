-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 15 oct. 2020 à 00:52
-- Version du serveur :  10.3.16-MariaDB
-- Version de PHP :  7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `brainyfood`
--

-- --------------------------------------------------------

--
-- Structure de la table `bienetre`
--

CREATE TABLE `bienetre` (
  `id_b` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `motivation` varchar(100) DEFAULT NULL,
  `souffrez_pathologies` varchar(100) DEFAULT NULL,
  `fumer_reg` varchar(100) NOT NULL,
  `arret_fumer` varchar(100) NOT NULL,
  `age` varchar(100) NOT NULL,
  `taille` varchar(100) NOT NULL,
  `poids` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `bodycheck`
--

CREATE TABLE `bodycheck` (
  `id_q` int(11) NOT NULL,
  `email_user` varchar(100) DEFAULT NULL,
  `info_perso` varchar(10) DEFAULT NULL,
  `alimentation1` varchar(150) DEFAULT NULL,
  `alimentation2` varchar(150) DEFAULT NULL,
  `budget_alimen` varchar(150) DEFAULT NULL,
  `consom_feculent` varchar(150) DEFAULT NULL,
  `consom_legume` varchar(150) DEFAULT NULL,
  `consom_fruit` varchar(150) DEFAULT NULL,
  `consom_viande` varchar(150) DEFAULT NULL,
  `consom_laitiers` varchar(150) DEFAULT NULL,
  `consom_prod_gras` varchar(150) DEFAULT NULL,
  `consom_prod_sucre` varchar(150) DEFAULT NULL,
  `consom_alcool` varchar(150) DEFAULT NULL,
  `vous_grignotez` varchar(150) DEFAULT NULL,
  `saute_repas` varchar(150) DEFAULT NULL,
  `oui_lequel` varchar(150) DEFAULT NULL,
  `activite_jour` varchar(150) DEFAULT NULL,
  `heure_sport` varchar(150) DEFAULT NULL,
  `travaill_horraire_decale` varchar(150) DEFAULT NULL,
  `probleme_de` varchar(150) DEFAULT NULL,
  `objectif` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `bodycheck`
--

INSERT INTO `bodycheck` (`id_q`, `email_user`, `info_perso`, `alimentation1`, `alimentation2`, `budget_alimen`, `consom_feculent`, `consom_legume`, `consom_fruit`, `consom_viande`, `consom_laitiers`, `consom_prod_gras`, `consom_prod_sucre`, `consom_alcool`, `vous_grignotez`, `saute_repas`, `oui_lequel`, `activite_jour`, `heure_sport`, `travaill_horraire_decale`, `probleme_de`, `objectif`) VALUES
(2, 'jawher.zairi@sesame.com.tn', 'HOMME', 'J’aime cuisiner', 'Variée', '< 30 euros', '2 à 3 portions par jour', 'Plus de 3 portions par jour', 'Plus de 3 portions par jour', 'Plus de 3 portions par jour', 'Plus de 3 portions par jour', 'Tous les jours', 'Plusieurs fois par jour', 'Plusieurs verres par jour', 'OUI', 'SOUVENT', 'DEJEUNER', 'Domestique (ménage, repassage, entretien de la maison ...)', 'de  1 à 2h', 'OUI', 'Sommeil Fatigue', 'Minceur');

-- --------------------------------------------------------

--
-- Structure de la table `miniceur`
--

CREATE TABLE `miniceur` (
  `id_m` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `poids_souhaite` varchar(100) DEFAULT NULL,
  `ou_surpoids` varchar(100) DEFAULT NULL,
  `cause_surpoids` varchar(100) DEFAULT NULL,
  `souffrez_pathologies` varchar(100) DEFAULT NULL,
  `fumer_reg` varchar(100) DEFAULT NULL,
  `arret_fumer` varchar(100) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `taille` varchar(100) DEFAULT NULL,
  `poids` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `miniceur`
--

INSERT INTO `miniceur` (`id_m`, `question_id`, `poids_souhaite`, `ou_surpoids`, `cause_surpoids`, `souffrez_pathologies`, `fumer_reg`, `arret_fumer`, `age`, `taille`, `poids`) VALUES
(12, 2, '75', 'Ventre', 'Mauvaises Habitudes', 'Insuffisance rénale', 'OUI', 'OUI', '25', '175', '95');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `info_perso` varchar(30) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `taille` varchar(10) DEFAULT NULL,
  `poids` varchar(10) DEFAULT NULL,
  `objectif` varchar(100) DEFAULT NULL,
  `stress` varchar(100) DEFAULT NULL,
  `habitude_alim` varchar(100) DEFAULT NULL,
  `aliment_consm_pas` varchar(100) DEFAULT NULL,
  `ethnicity` varchar(100) DEFAULT NULL,
  `activite_sportive` varchar(100) DEFAULT NULL,
  `activite_physique` varchar(100) DEFAULT NULL,
  `complement_alimentaire` varchar(100) DEFAULT NULL,
  `lequels` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `info_perso`, `age`, `taille`, `poids`, `objectif`, `stress`, `habitude_alim`, `aliment_consm_pas`, `ethnicity`, `activite_sportive`, `activite_physique`, `complement_alimentaire`, `lequels`, `email`) VALUES
(6, 'HOMME', '25', '175', '75', 'Détecter des carences alimentaires', 'Jamais / pas du tout ', 'Végétarien : je ne mange pas de viande (ni viande rouge, ni viande blanche), ni de poisson, mais je ', 'Viande blanche', 'Jamais ou peu (moins d’une fois par quinzaine)', '10 min ', '5 Min ', 'Oui', 'Vitamine D', 'jawher.zairi@sesame.com.tn');

-- --------------------------------------------------------

--
-- Structure de la table `sport`
--

CREATE TABLE `sport` (
  `id_s` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `motivation` varchar(100) DEFAULT NULL,
  `souffrez_pathologies` varchar(100) DEFAULT NULL,
  `fumer_reg` varchar(100) DEFAULT NULL,
  `arret_fumer` varchar(100) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `taille` varchar(100) DEFAULT NULL,
  `poids` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bienetre`
--
ALTER TABLE `bienetre`
  ADD PRIMARY KEY (`id_b`);

--
-- Index pour la table `bodycheck`
--
ALTER TABLE `bodycheck`
  ADD PRIMARY KEY (`id_q`);

--
-- Index pour la table `miniceur`
--
ALTER TABLE `miniceur`
  ADD PRIMARY KEY (`id_m`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`id_s`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bienetre`
--
ALTER TABLE `bienetre`
  MODIFY `id_b` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `bodycheck`
--
ALTER TABLE `bodycheck`
  MODIFY `id_q` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `miniceur`
--
ALTER TABLE `miniceur`
  MODIFY `id_m` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `sport`
--
ALTER TABLE `sport`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
