-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Sep 21, 2021 at 02:10 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `attachment` varchar(120) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `userId`, `title`, `content`, `attachment`, `likes`, `createdAt`, `updatedAt`) VALUES
(38, 23, 'République tchèque', 'La République tchèque est un pays d\'Europe centrale réputé pour ses châteaux richement ornés, ses bières nationales et sa longue histoire. Prague, la capitale, abrite le majestueux château de Prague du IXe siècle, une vieille ville médiévale bien conservée et le pont Charles bordé de statues. Český Krumlov, petite ville de la région de Bohême du Sud, est renommée pour ses nombreux bâtiments gothiques, baroques et Renaissance, dont la plupart abritent des restaurants et des boutiques.', 'jRHKlFJBQfI', 0, '2021-09-02 10:12:43', '2021-09-02 10:12:43'),
(39, 24, 'Espagne', 'L\'Espagne est un pays européen situé sur la péninsule ibérique et comprenant 17 régions autonomes à la géographie et aux cultures diverses. Madrid, la capitale, abrite le palais royal et le musée du Prado, où sont exposées les œuvres d\'artistes européens. On peut admirer à Ségovie un château médiéval (l\'Alcazar) et un aqueduc romain intact. La capitale de la Catalogne, Barcelone, se caractérise par les monuments modernistes d\'Antoni Gaudí, notamment la Sagrada Família. ', 'f86ACCDQMMA', 0, '2021-09-02 10:20:04', '2021-09-02 10:20:04'),
(40, 25, 'Russie', 'La Russie, en forme longue la fédération de Russie, est un État fédéral transcontinental. Plus vaste État de la planète, la Russie est à cheval sur l\'Asie du Nord et sur l\'Europe.', 'tlUbV1uB_KA', 0, '2021-09-02 10:23:24', '2021-09-02 10:23:24'),
(41, 26, 'France', 'La France, pays de l\'Europe occidentale, compte des villes médiévales, des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d\'art classique, dont celui du Louvre, et ses monuments comme la Tour Eiffel. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l\'immense château de Versailles témoignent de sa riche histoire.', 'cen0d3AAIAg', 0, '2021-09-02 10:26:05', '2021-09-02 10:26:05'),
(42, 27, 'Suisse', 'La Suisse est un pays montagneux d\'Europe centrale abritant de nombreux lacs et villages, ainsi que les hauts sommets des Alpes. Les villes du pays comprennent des quartiers médiévaux et des monuments comme la Zytglogge (tour-clocher) de Berne, la capitale, et le pont en bois de la chapelle de Lucerne. Le pays est également réputé pour ses stations de ski et ses sentiers de randonnée. Les industries clés sont les secteurs bancaire et financier, et les montres et le chocolat suisses sont mondialement célèbres.', '1jbAyobCJYM', 0, '2021-09-02 10:30:24', '2021-09-02 10:30:24'),
(43, 28, 'Écosse', 'L\'Écosse, nation la plus au nord du Royaume-Uni, comprend des régions sauvages montagneuses telles que les Cairngorms et les Northwest Highlands, entrecoupées de glens glaciaires (vallées) et de lochs (lacs). Ses principales villes sont Édimbourg, la capitale, avec son château emblématique perché sur une colline, et Glasgow, célèbre pour sa scène culturelle dynamique. L\'Écosse est également réputée pour le golf, sport né sur le Old Course à St Andrews dans les années 1400.', '65pk721h4iA', 0, '2021-09-02 10:33:08', '2021-09-02 10:33:08'),
(44, 29, 'Australie', 'L\'Australie est un pays et continent entouré par les océans Indien et Pacifique. Ses principales villes, Sydney, Brisbane, Melbourne, Perth et Adélaïde, sont bâties sur la côte. La capitale, Canberra, est quant à elle située à l\'intérieur des terres. Le pays est connu pour l\'opéra de Sydney, la Grande Barrière de corail, ses grandes étendues sauvages et désertiques appelées l\'Outback, et ses espèces animales uniques comme le kangourou et l\'ornithorynque.', 'uFOryFVHO-0', 0, '2021-09-02 10:34:37', '2021-09-02 10:34:37'),
(45, 30, 'Allemagne', 'L\'Allemagne est un pays d\'Europe de l\'Ouest dont le paysage se compose de forêts, de rivières, de chaînes montagneuses et de plages sur la mer du Nord. Son histoire remonte à plus de 2 000 ans en arrière. Dotée d\'une vie artistique et nocturne animée, Berlin, sa capitale, inclut la porte de Brandebourg et de nombreux sites en lien avec la Seconde Guerre mondiale. Munich est connue pour son Oktoberfest et ses bars à bières, notamment l\'Hofbräuhaus qui date du XVIe siècle. Francfort, avec ses gratte-ciel, abrite la Banque centrale européenne. ', 'dhX0w4hWBrU', 0, '2021-09-02 10:37:02', '2021-09-02 10:37:02'),
(46, 31, 'USA', 'Les États-Unis sont un pays constitué de 50 états et couvrant une vaste portion de l\'Amérique du Nord, avec l\'Alaska au nord-ouest et Hawaï étendant la présence du pays dans l\'océan Pacifique. Les principales villes de la côte atlantique sont New York, centre international financier et culturel, et Washington, la capitale. Dans la région du Midwest, la métropole de Chicago est connue pour son architecture influente et sur la côte ouest, le quartier d\'Hollywood à Los Angeles est célèbre pour ses studios de cinéma.', 'XqqvKCn8Jqg', 0, '2021-09-02 10:38:42', '2021-09-02 10:38:42'),
(47, 32, 'Autriche', 'L\'Autriche est un pays germanophone d\'Europe centrale caractérisé par des villages de montagne, une architecture baroque, une histoire impériale et des terrains alpins escarpés. Située sur le Danube, Vienne, la capitale, abrite les palais de Schönbrunn et Hofburg. Mozart, Strauss et Freud ont habité la ville. Le pays compte d\'autres régions notables comme la forêt de Bohême et le lac Traunsee, au nord, et les collines de vignobles à l\'est. ', 'xnOzw7LRNVo', 0, '2021-09-02 10:42:30', '2021-09-02 10:42:30'),
(49, 38, 'Finale US Open 1', 'Daniil Medvedev vs Felix Auger-Aliassime Highlights | 2021 US Open Semifinal', 'ABZaj2nn4ac', 0, '2021-09-17 15:33:46', '2021-09-17 15:33:46'),
(50, 38, 'Finale US Open 2', 'Novak Djokovic vs Daniil Medvedev Extended Highlights | 2021 US Open Final\n', 'iQcNk6lBMsE', 0, '2021-09-17 15:36:30', '2021-09-17 15:36:30'),
(51, 38, 'Finale US Open 3', 'Daniil Medvedev wins the 2021 US Open!\n', 'KpIsoWJaIUA', 0, '2021-09-17 15:38:17', '2021-09-17 15:38:17');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(23, 'Ivan Lendl', 'ivan.lendl@groupomania.com', '$2b$10$GEAV3Y9LdnyGl14U8Run5.FcS5Hg9P2QWf/3Q.MDuIFrrAjtZUKwO', 'Ivan Lendl, né le 7 mars 1960 à Ostrava, est un joueur de tennis tchécoslovaque, et américain depuis 1992.', 1, '2021-09-02 10:10:45', '2021-09-02 16:05:34'),
(24, 'Carlos Moyà', 'carlos.moya@groupomania.com', '$2b$10$IkzKxa6JFGLzcaFOrrJyMOPN0X0oU/Ilat0QFuSbWRHK0ARMM1XMG', 'Carlos Moyà Llompart, né le 27 août 1976 à Palma de Majorque, est un ancien joueur de tennis espagnol, professionnel entre 1995 et 2010, devenu entraineur. Bien qu\'il joue avec la main droite, il est naturellement gaucher, ce qui est l\'exact inverse de son ami Rafael Nadal. ', 0, '2021-09-02 10:17:24', '2021-09-02 10:17:24'),
(25, 'Marat Safin', 'marat.safin@groupomania.com', '$2b$10$H7fz5T5uQfODPaOnv8xLd.hXo7EFMyx0xSARrg9FYlZV3SB021RZO', 'Marat Moubinovitch Safin, né le 27 janvier 1980 à Moscou, est un joueur de tennis et homme politique russe. Joueur professionnel de 1997 à 2009, il a remporté 15 titres en simple sur le circuit ATP, dont l\'US Open en 2000 qui lui permet d\'atteindre la première place mondiale, puis l\'Open d\'Australie en 2005.', 0, '2021-09-02 10:22:08', '2021-09-02 10:22:08'),
(26, 'Fabrice Santoro', 'fabrice.santoro@groupomania.com', '$2b$10$DZsjen/KfM91/XJrm.RDw.mzo9ikFBSr7f4r39K.3W.rv6itOYu.W', 'Au cours de sa carrière de plus de vingt ans sur le circuit professionnel (de 1989 à 2010), il s\'est révélé être un joueur très atypique, non seulement en raison de sa prise de raquette à deux mains des deux côtés (rare dans le tennis moderne), mais également dans sa capacité à produire un tennis « spectaculaire ». Il s\'est particulièrement illustré en double où il a été no 6 mondial, a gagné 24 titres (sur un total de 42 finales jouées) dont deux du Grand Chelem à Melbourne ainsi que le Masters aux côtés de son compatriote Michaël Llodra.', 0, '2021-09-02 10:25:11', '2021-09-02 10:25:11'),
(27, 'Roger Federer', 'roger.federer@groupomania.com', '$2b$10$qF5.DegPJ4QEmcVg06aG7eWMZhVu9nTVZDtJLKUYHfYgCI/x6pGwy', 'Roger Federer, né le 8 août 1981 à Bâle, est un joueur de tennis suisse. Joueur professionnel depuis 1998, il a occupé durant 310 semaines la première place du classement mondial de tennis ATP World ', 0, '2021-09-02 10:29:35', '2021-09-02 10:29:35'),
(28, 'Andy Murray', 'andy.murray@groupomania.com', '$2b$10$5dzOvZMnXzAESX5/6Kw4eeuS6JKwM4bfJPbjfMBkS/Gk6vme/STFO', 'Sir Andrew Barron Murray, dit Andy Murray, est un joueur professionnel de tennis britannique né le 15 mai 1987 à Glasgow. Il a remporté quarante-six titres ATP en simple messieurs, dont trois titres du Grand Chelem, un Masters, deux médailles d\'or olympiques et quatorze Masters 1000.', 0, '2021-09-02 10:32:17', '2021-09-02 10:32:17'),
(29, 'Leytton Hewitt', 'leytton.hewitt@groupomania.com', '$2b$10$DRjj2MtaaRw/3vm5EidUUeb6qtGOcmEJkSBN.T96hmWbx2B6fM5JG', 'Lleyton Gylnn Hewitt, né le 24 février 1981 à Adélaïde, est un joueur de tennis australien. Professionnel de 1998 à 2016, il a remporté 30 titres en simple sur le circuit ATP, dont l\'US Open en 2001, Wimbledon en 2002 ainsi que les Masters lors de ces deux saisons. ', 0, '2021-09-02 10:33:56', '2021-09-02 10:33:56'),
(30, 'Boris Becker', 'boris.becker@groupomania.com', '$2b$10$vv4hxzVaN8MrUERCapntFeAx/5pgqTHkEeDbMWotX2mvNtQrcb2Qu', 'Boris Franz Becker, né à Leimen le 22 novembre 1967, est un joueur de tennis allemand professionnel. Il a remporté six tournois du Grand Chelem, Wimbledon en 1985, 1986 et 1989, l\'US Open en 1989 et l\'Open d\'Australie en 1991 et 1996.', 1, '2021-09-02 10:36:06', '2021-09-02 10:36:06'),
(31, 'Pete Sampras', 'pete.sampras@groupomania.com', '$2b$10$OU90L08syuP3yDq7WSAnpORd.6zGWri81LXNKKn5bzX9krQoH8R9i', 'Petros Sampras, dit Pete Sampras, né le 12 août 1971 à Washington, est un joueur de tennis américain. Professionnel de 1988 à 2002, il a remporté 64 titres en simple sur le circuit ATP, dont 21 titres majeurs, incluant 14 tournois du Grand Chelem, 5 Masters, et 2 Coupes du Grand Chelem.', 0, '2021-09-02 10:38:04', '2021-09-02 10:38:04'),
(32, 'Dominic Thiem', 'dominic.thiem@groupomania.com', '$2b$10$oDr4LHcp3Pq7yaA2PQH/A.8K97gf8SffS4BD0MZfhyZUzJLNAZuRy', 'Dominic Thiem, né le 3 septembre 1993 à Wiener Neustadt, est un joueur de tennis autrichien professionnel depuis 2012. Il a remporté dix-sept titres en simple sur le circuit ATP et atteint la 3ᵉ place mondiale. En 2020, il remporte son premier titre du Grand Chelem à l\'US Open.', 0, '2021-09-02 10:41:27', '2021-09-02 10:41:27'),
(38, 'Daniil Medvedev', 'Daniil.Medvedev@groupomania.com', '$2b$10$5w3D20v9d0gSP99ZrW9yDOOItnvS0avJ6sS02yTxnb..bFQkJzhP6', 'Daniil Medvedev, né le 11 février 1996 à Moscou, est un joueur de tennis russe, professionnel depuis 2014. Il comptabilise treize titres sur le circuit ATP dont l\'US Open 2021 où il triomphe en finale contre le numéro 1 Novak Djokovic, l\'empêchant de réaliser un Grand Chelem calendaire.', 0, '2021-09-17 15:32:23', '2021-09-17 15:32:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iduser` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
