

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    nom VARCHAR(150) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL, 

    role VARCHAR(50) NOT NULL CHECK (
        role IN (
            'SUPER_ADMIN',
            'ADMIN',
            'STAFF',
            'MENTOR',
            'FORMATEUR'
        )
    ),

    actif BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    last_login TIMESTAMP
);


CREATE TABLE salles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    numero VARCHAR(50) UNIQUE NOT NULL,

    nom VARCHAR(150) NOT NULL,

    type VARCHAR(50) NOT NULL CHECK (
        type IN (
            'coworking',
            'salle_reunion',
            'salle_formation',
            'lounge'
        )
    ),

    capacite INTEGER NOT NULL CHECK (capacite > 0),

    statut VARCHAR(50) DEFAULT 'disponible' CHECK (
        statut IN (
            'disponible',
            'hors_service'
        )
    ),

    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    salle_id UUID NOT NULL REFERENCES salles(id)
        ON DELETE CASCADE,

    client_nom VARCHAR(150) NOT NULL,

    client_tel VARCHAR(50) NOT NULL,

    date_debut TIMESTAMP NOT NULL,

    date_fin TIMESTAMP NOT NULL,

    statut VARCHAR(50) DEFAULT 'en_attente' CHECK (
        statut IN (
            'en_attente',
            'confirmée',
            'annulée',
            'terminée'
        )
    ),

    montant NUMERIC(10,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_dates
        CHECK (date_fin > date_debut)
);


CREATE TABLE candidatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    nom VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL,

    tel VARCHAR(50) NOT NULL,

    nom_projet VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    statut VARCHAR(50) DEFAULT 'nouvelle' CHECK (
        statut IN (
            'nouvelle',
            'evaluation',
            'acceptée',
            'refusée'
        )
    ),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE projets_incubes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    candidature_id UUID UNIQUE NOT NULL
        REFERENCES candidatures(id)
        ON DELETE CASCADE,

    mentor_id UUID REFERENCES users(id)
        ON DELETE SET NULL,

    stade VARCHAR(100),

    progression INTEGER DEFAULT 0 CHECK (
        progression >= 0
        AND progression <= 100
    ),

    statut VARCHAR(50) DEFAULT 'actif' CHECK (
        statut IN (
            'actif',
            'en_pause',
            'terminé'
        )
    ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE formations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    titre VARCHAR(200) NOT NULL,

    programme TEXT NOT NULL,

    benefices TEXT,

    prix NUMERIC(10,2) DEFAULT 0,

    date_debut TIMESTAMP NOT NULL,

    nb_places INTEGER NOT NULL CHECK (nb_places > 0),

    statut_ouvert BOOLEAN DEFAULT TRUE,

    formateur_id UUID REFERENCES users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE inscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    formation_id UUID NOT NULL
        REFERENCES formations(id)
        ON DELETE CASCADE,

    nom VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL,

    tel VARCHAR(50) NOT NULL,

    statut VARCHAR(50) DEFAULT 'en_attente' CHECK (
        statut IN (
            'en_attente',
            'confirmée',
            'annulée'
        )
    ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE investors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    nom VARCHAR(150) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    tel VARCHAR(50),

    secteurs TEXT,

    statut VARCHAR(50) DEFAULT 'actif' CHECK (
        statut IN (
            'actif',
            'inactif'
        )
    ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    nom VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL,

    objet VARCHAR(200) NOT NULL,

    message TEXT NOT NULL,

    statut VARCHAR(50) DEFAULT 'nouveau' CHECK (
        statut IN (
            'nouveau',
            'traité',
            'archivé'
        )
    ),

    source VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE content_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    page_slug VARCHAR(150) NOT NULL,

    bloc_key VARCHAR(150) NOT NULL,

    valeur_texte TEXT,

    media_url TEXT,

    actif BOOLEAN DEFAULT TRUE,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    cle VARCHAR(150) UNIQUE NOT NULL,

    valeur TEXT,

    description TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_reservations_salle
ON reservations(salle_id);

CREATE INDEX idx_reservations_dates
ON reservations(date_debut, date_fin);

CREATE INDEX idx_candidatures_statut
ON candidatures(statut);

CREATE INDEX idx_formations_date
ON formations(date_debut);

CREATE INDEX idx_inscriptions_formation
ON inscriptions(formation_id);



INSERT INTO users (
    nom,
    email,
    password_hash,
    role
)
VALUES (
    'Super Administra',
    'admin@maleahubi.com',
    '$2b$10$NQ2fGjZxK2yQ9nm2RPUnEutjVQy6ZRl9fmTqmSgXGUwTn/TGQN4ki', --password
    'SUPER_ADMIN'
);







-- 1. Supprimer les anciennes contraintes
ALTER TABLE candidatures DROP CONSTRAINT IF EXISTS candidatures_statut_check;
ALTER TABLE inscriptions DROP CONSTRAINT IF EXISTS inscriptions_statut_check;
ALTER TABLE reservations DROP CONSTRAINT IF EXISTS reservations_statut_check;

-- 2. Recréer les contraintes avec des valeurs SANS accents
ALTER TABLE candidatures ADD CONSTRAINT candidatures_statut_check 
  CHECK (statut IN ('nouvelle', 'evaluation', 'acceptee', 'refusee'));

ALTER TABLE inscriptions ADD CONSTRAINT inscriptions_statut_check 
  CHECK (statut IN ('en_attente', 'confirmee', 'annulee'));

ALTER TABLE reservations ADD CONSTRAINT reservations_statut_check 
  CHECK (statut IN ('en_attente', 'confirmee', 'annulee', 'terminee'));

-- 3. Mettre à jour les données existantes
UPDATE candidatures SET statut = 'acceptee' WHERE statut = 'acceptée';
UPDATE candidatures SET statut = 'refusee' WHERE statut = 'refusée';
UPDATE inscriptions SET statut = 'confirmee' WHERE statut = 'confirmée';
UPDATE inscriptions SET statut = 'annulee' WHERE statut = 'annulée';
UPDATE reservations SET statut = 'confirmee' WHERE statut = 'confirmée';
UPDATE reservations SET statut = 'annulee' WHERE statut = 'annulée';
UPDATE reservations SET statut = 'terminee' WHERE statut = 'terminée';


-- 1. Supprimer l'ancienne contrainte
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_statut_check;

-- 2. Recréer la contrainte avec des valeurs SANS accents
ALTER TABLE contacts ADD CONSTRAINT contacts_statut_check 
  CHECK (statut IN ('nouveau', 'traite', 'archive'));

-- 3. Mettre à jour les données existantes
UPDATE contacts SET statut = 'traite' WHERE statut = 'traité';
UPDATE contacts SET statut = 'archive' WHERE statut = 'archivé';


--ajout des annonces et memebres de l'equipe:

DO $$ 
BEGIN
    BEGIN
        ALTER TABLE content_blocks ADD CONSTRAINT uq_content_blocks_page_bloc UNIQUE (page_slug, bloc_key);
    EXCEPTION
        WHEN duplicate_table THEN
            -- Constraint already exists, do nothing
            NULL;
    END;
END $$;

-- 2. Table des annonces / événements
CREATE TABLE IF NOT EXISTS announcements (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre       VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url   TEXT,
    date_event  VARCHAR(100),          -- ex: "15-19 Juillet 2024"
    lien_wa     TEXT,                  -- lien WhatsApp optionnel
    actif       BOOLEAN DEFAULT TRUE,
    ordre       INTEGER DEFAULT 0,     -- pour trier l'ordre d'affichage
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des membres de l'équipe
CREATE TABLE IF NOT EXISTS team_members (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom        VARCHAR(150) NOT NULL,
    role       VARCHAR(150) NOT NULL,
    image_url  TEXT,
    bio        TEXT,
    ordre      INTEGER DEFAULT 0,      -- pour trier l'ordre d'affichage
    actif      BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Données initiales — annonces
INSERT INTO announcements (titre, description, date_event, lien_wa, ordre) VALUES
  ('Jobs Week - Session Juillet 2024',
   'Programme intensif de 5 jours pour être prêt pour l''emploi. Optimisation CV, entretiens blancs et matching avec des employeurs.',
   '15-19 Juillet 2024',
   'https://wa.me/237678111022?text=Bonjour, je souhaite participer à Jobs Week',
   1),
  ('Incubateur Malea Lab',
   'Programme d''accompagnement de 3 mois pour les startups innovantes. Mentorat, networking et accès aux investisseurs.',
   'Inscriptions ouvertes',
   'https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l''incubateur Malea Lab',
   2),
  ('Networking Evening',
   'Rencontrez des entrepreneurs, investisseurs et professionnels lors de notre soirée networking mensuelle.',
   'Chaque dernier vendredi du mois',
   'https://wa.me/237678111022?text=Bonjour, je souhaite participer au Networking Evening',
   3);

-- 5. Données initiales — équipe
INSERT INTO team_members (nom, role, ordre) VALUES
  ('Erdman Doumbè',  'Fondateur & CEO',               1),
  ('Sarah Kamga',    'Directrice des Programmes',      2),
  ('Michael Tchouta','Lead Mentor',                    3),
  ('Amira Diallo',   'Community Manager',              4),
  ('Jean Njiké',     'Chargé d''Incubation',           5),
  ('Clarisse Ngo',   'Formatrice certifiée',           6);

-- 6. Index
CREATE INDEX IF NOT EXISTS idx_announcements_ordre ON announcements(ordre, actif);
CREATE INDEX IF NOT EXISTS idx_team_members_ordre  ON team_members(ordre, actif);


-- Tables pour les newsletters:

-- Table des abonnés à la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(150) NOT NULL UNIQUE,
    consentement BOOLEAN DEFAULT TRUE,
    actif BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_actif ON newsletter_subscribers(actif);





-- pour la library et autres:

-- Table des livres de la bibliothèque
CREATE TABLE library_books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    author VARCHAR(255),
    cover_image VARCHAR(500),
    category VARCHAR(100),
    isbn VARCHAR(50),
    published_year INT,
    pages INT,
    download_url VARCHAR(500),
    preview_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_is_featured (is_featured),
    INDEX idx_sort_order (sort_order)
);

-- Table des catégories de livres (optionnelle)
CREATE TABLE library_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);