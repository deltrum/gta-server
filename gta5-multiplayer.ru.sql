-- phpMyAdmin SQL Dump
-- version 4.0.10.19
-- https://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 28 2018 г., 23:19
-- Версия сервера: 5.5.54-38.7
-- Версия PHP: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `gta5-multiplayer.ru`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auth_assignment`
--

CREATE TABLE IF NOT EXISTS `auth_assignment` (
  `item_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `auth_assignment`
--

INSERT INTO `auth_assignment` (`item_name`, `user_id`, `created_at`) VALUES
('admin', '1', 1497680550),
('admin', '5', 1519364920),
('user', '12', 1511434296),
('user', '4', 1501480231);

-- --------------------------------------------------------

--
-- Структура таблицы `auth_item`
--

CREATE TABLE IF NOT EXISTS `auth_item` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `rule_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `auth_item`
--

INSERT INTO `auth_item` (`name`, `type`, `description`, `rule_name`, `data`, `created_at`, `updated_at`) VALUES
('/admin/*', 2, NULL, NULL, NULL, 1484843836, 1484843836),
('/admin/news/*', 2, NULL, NULL, NULL, 1514010977, 1514010977),
('/debug/*', 2, NULL, NULL, NULL, 1511348209, 1511348209),
('/elfinder/*', 2, NULL, NULL, NULL, 1514010865, 1514010865),
('/gii/*', 2, NULL, NULL, NULL, 1511348202, 1511348202),
('/profile/*', 2, NULL, NULL, NULL, 1485105921, 1485105921),
('/rbac/*', 2, NULL, NULL, NULL, 1484843856, 1484843856),
('admin', 1, NULL, NULL, NULL, 1484844095, 1484844095),
('adminAccess', 2, NULL, NULL, NULL, 1484843979, 1484843979),
('moder', 1, NULL, NULL, NULL, 1484844109, 1484844109),
('moderAccess', 2, NULL, NULL, NULL, 1484844020, 1484844020),
('user', 1, NULL, NULL, NULL, 1485072653, 1485072653),
('userAccess', 2, NULL, NULL, NULL, 1485072617, 1485072617);

-- --------------------------------------------------------

--
-- Структура таблицы `auth_item_child`
--

CREATE TABLE IF NOT EXISTS `auth_item_child` (
  `parent` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `child` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `auth_item_child`
--

INSERT INTO `auth_item_child` (`parent`, `child`) VALUES
('moderAccess', '/admin/*'),
('moderAccess', '/admin/news/*'),
('adminAccess', '/debug/*'),
('moderAccess', '/elfinder/*'),
('adminAccess', '/gii/*'),
('userAccess', '/profile/*'),
('adminAccess', '/rbac/*'),
('admin', 'adminAccess'),
('admin', 'moderAccess'),
('moder', 'moderAccess'),
('admin', 'userAccess'),
('moder', 'userAccess'),
('user', 'userAccess');

-- --------------------------------------------------------

--
-- Структура таблицы `auth_rule`
--

CREATE TABLE IF NOT EXISTS `auth_rule` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `banks`
--

CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `banks`
--

INSERT INTO `banks` (`id`, `balance`) VALUES
(4, 201730),
(7, 3220),
(8, 500);

-- --------------------------------------------------------

--
-- Структура таблицы `donate`
--

CREATE TABLE IF NOT EXISTS `donate` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `donate` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `status` int(1) NOT NULL,
  `description` varchar(50) NOT NULL,
  `date` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `donate`
--

INSERT INTO `donate` (`id`, `donate`, `user_id`, `status`, `description`, `date`) VALUES
(1, 10, 1, 2, 'INTERKASSA', 1512720795),
(2, 10, 1, 2, 'ROBOKASSA', 1512720830),
(3, 10, 1, 4, 'INTERKASSA', 1514373679);

-- --------------------------------------------------------

--
-- Структура таблицы `materials`
--

CREATE TABLE IF NOT EXISTS `materials` (
  `id` int(2) NOT NULL,
  `warehouse` smallint(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `materials`
--

INSERT INTO `materials` (`id`, `warehouse`) VALUES
(1, 200),
(2, 200),
(5, 3000),
(6, 3600);

-- --------------------------------------------------------

--
-- Структура таблицы `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `data` blob,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `migration`
--

CREATE TABLE IF NOT EXISTS `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1484836683),
('m140506_102106_rbac_init', 1484838273),
('m140602_111327_create_menu_table', 1484838260),
('m160312_050000_create_user', 1484838260),
('m170119_141945_create_news', 1484836684);

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` int(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `preview` text NOT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `date`, `title`, `preview`, `description`, `user_id`) VALUES
(1, 1484479440, 'Открытие сайта', 'Сегодня, в тестовом режиме был запущен сайт сервера. На данный момент на сайте вы можете посмотреть рейтинг игроков, и свой профиль. В будущем функционал будет дополняться.', 'Сегодня, в тестовом режиме был запущен сайт сервера. На данный момент на сайте вы можете посмотреть рейтинг игроков, и свой профиль. В будущем функционал будет дополняться.', 1),
(2, 1484845080, 'Список общих команд, имеющихся на нашем сервере', '1) Общие:<br>/me - выполнить действие <br>/do - событие игрового мира <span><br>/try - попытаться выполнить действие <br>/report - отправить жалобу администрации <br>/w - прошепать <br>/s - крикнуть <br>/sms [number] - написать сообщение <br>/p - ответить на звонок<br>/h - завершить звонок<br>/call [number] - позвонить <br>/ad - отправить сообщение в СМИ <br>/try - попытаться выполнить действие<br><br>2) Команды фракций:<br>2.1) Общие:<br>/members - посмотреть список фракции(онлайн)<br>/invite [id] - пригласить игрока во фракцию<br>/uninvite [id] - уволить игрока из фракции<br>/giverank [id] - повысить/понизить игрока своей фракции<br>/r(/f) - чат фракций<br>/d - волна департамента(только для гос. структур)<br>/gov - волна гос. новостей(только для гос. структур)<br>2.2) LSPD/SWAT: <br>/su [id] [Кол-во звезд] [Нарушение/Причина]- выдать розыск игроку<br>/arrest [id] - арестовать игрока <br>/wanted - посмотреть список преступников(онлайн)<br>/clear [id] - снять розыск игроку<br>2.3) City Hall:<br>/free [id] - выпустить игрока из тюрьмы(для адвокатов)<br>/demote [id] - уволить/понизить игрока гос.структур(только Мэра)<br>2.4) MOH LS:<br>/heal [id] - вылечить игрока<br>2.5) LS News:<br>/edit - редактировать объявление<br>/live - выйди в прямой эфир</span><br><img src="https://www.vixenvarsity.com/wp-content/uploads/2014/12/GTAV_PS4_Heists_026.jpg" style="width: 50%;">', '1) Общие:<br>/me - выполнить действие <br>/do - событие игрового мира <span><br>/try - попытаться выполнить действие <br>/report - отправить жалобу администрации <br>/w - прошепать <br>/s - крикнуть <br>/sms [number] - написать сообщение <br>/p - ответить на звонок<br>/h - завершить звонок<br>/call [number] - позвонить <br>/ad - отправить сообщение в СМИ <br>/try - попытаться выполнить действие<br><br>2) Команды фракций:<br>2.1) Общие:<br>/members - посмотреть список фракции(онлайн)<br>/invite [id] - пригласить игрока во фракцию<br>/uninvite [id] - уволить игрока из фракции<br>/giverank [id] - повысить/понизить игрока своей фракции<br>/r(/f) - чат фракций<br>/d - волна департамента(только для гос. структур)<br>/gov - волна гос. новостей(только для гос. структур)<br>2.2) LSPD/SWAT: <br>/su [id] [Кол-во звезд] [Нарушение/Причина]- выдать розыск игроку<br>/arrest [id] - арестовать игрока <br>/wanted - посмотреть список преступников(онлайн)<br>/clear [id] - снять розыск игроку<br>2.3) City Hall:<br>/free [id] - выпустить игрока из тюрьмы(для адвокатов)<br>/demote [id] - уволить/понизить игрока гос.структур(только Мэра)<br>2.4) MOH LS:<br>/heal [id] - вылечить игрока<br>2.5) LS News:<br>/edit - редактировать объявление<br>/live - выйди в прямой эфир</span><br><img src="https://www.vixenvarsity.com/wp-content/uploads/2014/12/GTAV_PS4_Heists_026.jpg" style="width: 50%;">\n', 1),
(3, 1486068780, 'Update 0.3a', '1) Добавлен лимит по времени на авторизацию, по истечению которого, игрок будет кикнут с сервера. <br> 2) Добавлена система прав администраторов. <br> 3) Добавлена статистика персонажей. <br> 4) Доработана команда /report, при ее вводе, появляется диалоговое окно.<br> 5) Добавлена система голода. <br> 6) Добавлена система обезвоживания.<br> 7) Теперь за оверфлуд кикает с сервера.<br> 8) Доработана система звонков и смс, теперь за все взымается плата.<br> 9) Команда /make заменена на диалоговое окно.<br> 10) Исправлена ошибка с выдачей розыска мафии.<br> <br> </b><br> <div style="text-align: center"><b><span style="font-size: 22px">Новые команды:</span></b></div><br><div>11)/dir - справочник</div> <div>12)/number - список тел.номеров&nbsp;</div> <div>13)/pdd - правила дорожного движения&nbsp;</div> <div>14)/togphone - выкл. телефон&nbsp;</div> <div>15)/balance - баланс мобильного телефона&nbsp;</div> <div>16)/money - узнать сколько наличных денег на руках&nbsp;</div> <div>17)/hi - поздороваться&nbsp;</div> <div>18)/id - поиск игрока по имени&nbsp;</div> <div>19)/pay - передача наличных средств&nbsp;</div> <div>20)/atm - открывает меню банкомата&nbsp;</div> <div>21)/mm - личное меню пользователя&nbsp;</div> <div>22)/warehouse - состояние склада&nbsp;</div> <div>23)/frisk - обыскать игрока&nbsp;</div> <div>24)/eat - купить еду</div> <div>25)/drink - купить попить</div> <div>26)/buy - покупка в магазине 24/7</div> <div>27)/items - содержимое карманов&nbsp;</div>', '1) Добавлен лимит по времени на авторизацию, по истечению которого, игрок будет кикнут с сервера. <br>\n2) Добавлена система прав администраторов. <br>\n3) Добавлена статистика персонажей. <br>\n4) Доработана команда /report, при ее вводе, появляется диалоговое окно.<br>\n5) Добавлена система голода. <br>\n6) Добавлена система обезвоживания.<br>\n7) Теперь за оверфлуд кикает с сервера.<br>\n8) Доработана система звонков и смс, теперь за все взымается плата.<br>\n9) Команда /make заменена на диалоговое окно.<br>\n10) Исправлена ошибка с выдачей розыска мафии.<br>\n<br>\n</b><br>\n<div style="text-align: center"><b><span style="font-size: 22px">Новые команды:</span></b></div><br><div>11)/dir - справочник</div>\n<div>12)/number - список тел.номеров&nbsp;</div>\n<div>13)/pdd - правила дорожного движения&nbsp;</div>\n<div>14)/togphone - выкл. телефон&nbsp;</div>\n<div>15)/balance - баланс мобильного телефона&nbsp;</div>\n<div>16)/money - узнать сколько наличных денег на руках&nbsp;</div>\n<div>17)/hi - поздороваться&nbsp;</div>\n<div>18)/id - поиск игрока по имени&nbsp;</div>\n<div>19)/pay - передача наличных средств&nbsp;</div>\n<div>20)/atm - открывает меню банкомата&nbsp;</div>\n<div>21)/mm - личное меню пользователя&nbsp;</div>\n<div>22)/warehouse - состояние склада&nbsp;</div>\n<div>23)/frisk - обыскать игрока&nbsp;</div>\n<div>24)/eat - купить еду</div>\n<div>25)/drink - купить попить</div>\n<div>26)/buy - покупка в магазине 24/7</div>\n<div>27)/items - содержимое карманов&nbsp;</div>\n', 1),
(4, 1488026820, 'Обновление 0.4', '<div>1)Проверка на РП ник игрока, при нонРП нике вы не сможете зайти на сервер(Пример РП ника: John_Dow,[Имя_Фамилия])</div> <div>2)Переписана система регистрации</div> <div>3)Теперь валидация происходит на стороне сервера, что повышает безопасность ваших данных</div> <div>&nbsp;</div> <div>Добавлены:</div> <div>&nbsp;</div> <div>Система налогов</div> <div>Система материалов</div> <div>Система наркотиков</div> <div>Система бензина</div> <div>Спидометр</div> <div>Работа таксиста</div> <div>Работа механика</div> <div>&nbsp;</div> <div>Новые команды:</div> <div>&nbsp;</div> <div>/settax [number] - выставить налог от (1 до 15%)</div> <div>/bank - посмотреть кол-во средств в банке фракции&nbsp;</div> <div>/free [id] [price] - выпустить игрока из тюрьмы(Для адвоката)</div> <div>/heal [id] [price] - вылечить игрока</div> <div>/wibank [price] - снять средства с банка фракции(Только для лидера)</div> <div>/rebank [price] - пополнить банк фракции</div> <div>/n - меню управления(Для новостей)</div> <div>/ad - подать объявления в СМИ</div> <div>/sms LS NEWS(Номер: 111) - отправить СМС в LS News</div> <div>/subsidy [id] - выдать субсидию игроку</div> <div>/hackdb [id] - взломать базу полиции(Для мафии с 4+ ранга)</div> <div>/takephone [id] - забрать телефон у игрока(Для мафии с 3+ ранга)</div> <div>/repr [id] [reason] - выдать выговор игроку(Для подзамов,замов и лидеров)</div> <div>/ex [id] [sec] - продлить срок для заключенного(Для сотрудников тюрьмы)</div> <div>/items - посмотреть свои карманы</div> <div>/refill [id] - заправить автомобиль игрока(Для механиков)</div> <div>/repair [id] [price] - отремонтировать автомобиль(Для механиков)</div> <div>/take [id] - забрать оружие, наркотики и т.п.</div> <div>/fare [price] - выставить тариф \\(Для таксистов)</div>', '<div>1)Проверка на РП ник игрока, при нонРП нике вы не сможете зайти на сервер(Пример РП ника: John_Dow,[Имя_Фамилия])</div>\n<div>2)Переписана система регистрации</div>\n<div>3)Теперь валидация происходит на стороне сервера, что повышает безопасность ваших данных</div>\n<div>&nbsp;</div>\n<div>Добавлены:</div>\n<div>&nbsp;</div>\n<div>Система налогов</div>\n<div>Система материалов</div>\n<div>Система наркотиков</div>\n<div>Система бензина</div>\n<div>Спидометр</div>\n<div>Работа таксиста</div>\n<div>Работа механика</div>\n<div>&nbsp;</div>\n<div>Новые команды:</div>\n<div>&nbsp;</div>\n<div>/settax [number] - выставить налог от (1 до 15%)</div>\n<div>/bank - посмотреть кол-во средств в банке фракции&nbsp;</div>\n<div>/free [id] [price] - выпустить игрока из тюрьмы(Для адвоката)</div>\n<div>/heal [id] [price] - вылечить игрока</div>\n<div>/wibank [price] - снять средства с банка фракции(Только для лидера)</div>\n<div>/rebank [price] - пополнить банк фракции</div>\n<div>/n - меню управления(Для новостей)</div>\n<div>/ad - подать объявления в СМИ</div>\n<div>/sms LS NEWS(Номер: 111) - отправить СМС в LS News</div>\n<div>/subsidy [id] - выдать субсидию игроку</div>\n<div>/hackdb [id] - взломать базу полиции(Для мафии с 4+ ранга)</div>\n<div>/takephone [id] - забрать телефон у игрока(Для мафии с 3+ ранга)</div>\n<div>/repr [id] [reason] - выдать выговор игроку(Для подзамов,замов и лидеров)</div>\n<div>/ex [id] [sec] - продлить срок для заключенного(Для сотрудников тюрьмы)</div>\n<div>/items - посмотреть свои карманы</div>\n<div>/refill [id] - заправить автомобиль игрока(Для механиков)</div>\n<div>/repair [id] [price] - отремонтировать автомобиль(Для механиков)</div>\n<div>/take [id] - забрать оружие, наркотики и т.п.</div>\n<div>/fare [price] - выставить тариф \\(Для таксистов)</div>\n', 1),
(5, 1500979541, 'Обновление дизайна сайта', '<img style="width:30vw" src="https://pp.userapi.com/c840227/v840227813/17c1f/dX7KgD_qsx4.jpg" /><p align="justify"><span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Время идет и мода меняется. При разработке сайта, к сожалению, мы не уделили должного внимания дизайну сайта .&nbsp;</span><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;"> 	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Поэтому так получилось, что дизайн оказался не только устаревшим, но и не удобным для восприятия. В связи с этим мы приняли решение полостью переосмыслить дизайн сайта и группы Вконтакте. За основу был взят нежно-зеленый фон, надеемся он придется вам по душе.&nbsp;</span></p> <p align="right"><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;"> 	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Спасибо, что вы с нами&nbsp;</span><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;"> 	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Администрация GTA5-MULTIPLAYER.RU</span></p>', '<img style="width:30vw" src="https://pp.userapi.com/c840227/v840227813/17c1f/dX7KgD_qsx4.jpg" /><p align="justify"><span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Время идет и мода меняется. При разработке сайта, к сожалению, мы не уделили должного внимания дизайну сайта .&nbsp;</span><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">\n	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Поэтому так получилось, что дизайн оказался не только устаревшим, но и не удобным для восприятия. В связи с этим мы приняли решение полостью переосмыслить дизайн сайта и группы Вконтакте. За основу был взят нежно-зеленый фон, надеемся он придется вам по душе.&nbsp;</span></p>\n<p align="right"><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">\n	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Спасибо, что вы с нами&nbsp;</span><br style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">\n	<span style="font-family: -apple-system, BlinkMacSystemFont, Roboto, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; background-color: #ffffff;">Администрация GTA5-MULTIPLAYER.RU\n</span></p>\n', 1),
(6, 1519392432, 'Разработка продолжается', '', '<p style="text-align:center"><a href="https://i.imgur.com/lrL8f4Q.png"><img alt="" src="https://i.imgur.com/lrL8f4Q.png" style="float:left" /></a></p>\n\n<p style="text-align:center">&nbsp;</p>\n\n<p style="text-align:center">&nbsp;</p>\n\n<p style="text-align:center">&nbsp;</p>\n\n<p style="text-align:center">&nbsp;</p>\n\n<p><br />\n<span style="color:rgba(0, 0, 0, 0.86); font-family:pt serif,serif; font-size:19px">Долгое время не было новостей от нас, за это время было переписано 90% кода, что приблизило нас на ещё один шаг к открытию.&nbsp;</span><br />\n<span style="color:rgba(0, 0, 0, 0.86); font-family:pt serif,serif; font-size:19px">Открытие проекта дело хорошее, но прежде чем это делать мы проведём ЗБТ на который сможет попасть любой желающий подав заявку ( о том куда и как писать заявку на участие в ЗБТ будет сообщено позднее ).</span></p>\n\n<p style="text-align:right"><span style="color:rgba(0, 0, 0, 0.87); font-family:-apple-system,blinkmacsystemfont,roboto,open sans,helvetica neue,sans-serif">Спасибо, что вы с нами&nbsp;</span><br />\n<span style="color:rgba(0, 0, 0, 0.87); font-family:-apple-system,blinkmacsystemfont,roboto,open sans,helvetica neue,sans-serif">Администрация GTA5-MULTIPLAYER.RU\n</span></p>\n', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `store`
--

CREATE TABLE IF NOT EXISTS `store` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) NOT NULL DEFAULT '0',
  `materials` int(5) NOT NULL DEFAULT '0',
  `balance` int(10) NOT NULL DEFAULT '0',
  `position` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Дамп данных таблицы `store`
--

INSERT INTO `store` (`id`, `owner_id`, `materials`, `balance`, `position`) VALUES
(1, 0, 50000, 0, '{"x":-1222.3084716796875,"y":-906.7237548828125,"z":12.326348304748535}'),
(2, 0, 50000, 0, '{"x":-47.21701431274414,"y":-1756.5859375,"z":29.420997619628906}'),
(3, 0, 50000, 0, '{"x":2555.62744140625,"y":382.0804138183594,"z":108.62295532226562}'),
(4, 0, 50000, 0, '{"x":2677.157958984375,"y":3281.35986328125,"z":55.24113845825195}'),
(5, 0, 50000, 0, '{"x":1729.61669921875,"y":6416.095703125,"z":35.0372314453125}'),
(6, 0, 50000, 0, '{"x":1698.1424560546875,"y":4924.42626953125,"z":42.06364440917969}'),
(7, 0, 50000, 0, '{"x":1960.2144775390625,"y":3742.24267578125,"z":32.34375}'),
(8, 0, 50000, 0, '{"x":1165.415283203125,"y":2709.395751953125,"z":38.15769958496094}'),
(9, 0, 50000, 0, '{"x":548.036376953125,"y":2669.542724609375,"z":42.15650939941406}'),
(10, 0, 50000, 0, '{"x":-1820.344482421875,"y":792.5403442382812,"z":138.10992431640625}'),
(11, 0, 50000, 0, '{"x":-2967.828369140625,"y":391.64202880859375,"z":15.04331111907959}'),
(12, 0, 50000, 0, '{"x":-3041.047607421875,"y":585.1148681640625,"z":7.908933162689209}'),
(13, 0, 50000, 0, '{"x":-3241.558837890625,"y":1001.2035522460938,"z":12.830714225769043}'),
(14, 0, 50000, 0, '{"x":373.5666809082031,"y":325.3853759765625,"z":103.56639099121094}'),
(15, 0, 50000, 0, '{"x":-1487.7569580078125,"y":-378.968017578125,"z":40.163421630859375}'),
(16, 0, 50000, 0, '{"x":-707.400146484375,"y":-914.6732788085938,"z":19.21558952331543}'),
(17, 0, 50000, 0, '{"x":1163.593017578125,"y":-323.8512878417969,"z":69.20507049560547}'),
(18, 0, 50000, 0, '{"x":1135.717041015625,"y":-982.9434204101562,"z":46.41584014892578}'),
(19, 0, 50000, 0, '{"x":1392.9197998046875,"y":3605.050537109375,"z":34.98090362548828}'),
(20, 0, 50000, 0, '{"x":25.665447235107422,"y":-1345.6651611328125,"z":29.497026443481445}'),
(21, 0, 50000, 0, '{"x":28.82343292236328,"y":-47.006874084472656,"z":66.15849304199219}'),
(22, 0, 50000, 0, '{"x":31.183347702026367,"y":-46.38157653808594,"z":66.25682067871094}');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(32) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `ga_secret` varchar(255) DEFAULT NULL,
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `ip` varchar(16) NOT NULL,
  `regip` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `auth_key` varchar(32) NOT NULL,
  `member` tinyint(2) NOT NULL DEFAULT '0',
  `rank` tinyint(2) NOT NULL DEFAULT '0',
  `job` tinyint(2) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `exp` smallint(3) NOT NULL DEFAULT '0',
  `kills` smallint(5) NOT NULL DEFAULT '0',
  `deaths` smallint(5) NOT NULL DEFAULT '0',
  `phone` text NOT NULL,
  `bank` int(10) NOT NULL DEFAULT '0',
  `offense` tinyint(1) NOT NULL DEFAULT '0',
  `mute` tinyint(1) NOT NULL DEFAULT '0',
  `ban` tinyint(1) NOT NULL DEFAULT '0',
  `jail` smallint(5) NOT NULL DEFAULT '0',
  `status` smallint(6) NOT NULL DEFAULT '10',
  `donate` smallint(5) NOT NULL DEFAULT '0',
  `dehydration` tinyint(3) NOT NULL DEFAULT '0',
  `satiety` tinyint(3) NOT NULL DEFAULT '0',
  `narcomaniac` smallint(5) NOT NULL DEFAULT '0',
  `items` text NOT NULL,
  `personage` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `password_hash`, `password_reset_token`, `ga_secret`, `created_at`, `updated_at`, `ip`, `regip`, `email`, `auth_key`, `member`, `rank`, `job`, `admin`, `exp`, `kills`, `deaths`, `phone`, `bank`, `offense`, `mute`, `ban`, `jail`, `status`, `donate`, `dehydration`, `satiety`, `narcomaniac`, `items`, `personage`) VALUES
(13, 'Tal_Rasha', '57958196b8576982e45aa324nm04568g', NULL, NULL, 1542086448, 1542089049, '127.0.0.1', '127.0.0.1', 'gta5-multiplayer@gmail.com', '', 0, 0, 0, 1, 1, 0, 0, '{"number":0,"signal":true,"presence":true,"balance":0}', 0, 0, 0, 0, 0, 10, 0, 16, 18, 0, '{}', '[0,[0,21,0.5,0.5],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0]]');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auth_assignment`
--
ALTER TABLE `auth_assignment`
  ADD CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `auth_item`
--
ALTER TABLE `auth_item`
  ADD CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `auth_item_child`
--
ALTER TABLE `auth_item_child`
  ADD CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `menu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
