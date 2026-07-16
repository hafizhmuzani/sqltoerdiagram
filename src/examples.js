export const EXAMPLE_SQL = {
  ecommerce: `-- E-commerce Schema
CREATE TABLE users (
  id            BIGINT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  full_name     VARCHAR(120),
  created_at    TIMESTAMP NOT NULL
);

CREATE TABLE products (
  id          BIGINT PRIMARY KEY,
  sku         VARCHAR(64) NOT NULL UNIQUE,
  name        VARCHAR(200) NOT NULL,
  price_cents INT NOT NULL,
  active      BOOLEAN NOT NULL
);

CREATE TABLE orders (
  id            BIGINT PRIMARY KEY,
  user_id       BIGINT NOT NULL REFERENCES users(id),
  status        VARCHAR(32) NOT NULL,
  total_cents   INT NOT NULL,
  placed_at     TIMESTAMP NOT NULL
);

CREATE TABLE order_items (
  id          BIGINT PRIMARY KEY,
  order_id    BIGINT NOT NULL REFERENCES orders(id),
  product_id  BIGINT NOT NULL REFERENCES products(id),
  quantity    INT NOT NULL,
  unit_cents  INT NOT NULL
);`,
  blog: `-- Blog Schema
CREATE TABLE authors (
  id         BIGINT PRIMARY KEY,
  username   VARCHAR(64) NOT NULL UNIQUE,
  bio        TEXT
);

CREATE TABLE posts (
  id         BIGINT PRIMARY KEY,
  author_id  BIGINT NOT NULL REFERENCES authors(id),
  title      VARCHAR(200) NOT NULL,
  slug       VARCHAR(200) NOT NULL UNIQUE,
  content    TEXT NOT NULL,
  published  BOOLEAN DEFAULT FALSE
);

CREATE TABLE tags (
  id   BIGINT PRIMARY KEY,
  name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id BIGINT NOT NULL REFERENCES posts(id),
  tag_id  BIGINT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE comments (
  id         BIGINT PRIMARY KEY,
  post_id    BIGINT NOT NULL REFERENCES posts(id),
  author_name VARCHAR(64) NOT NULL,
  body       TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);`,
  saas: `-- SaaS (B2B) Schema
CREATE TABLE organizations (
  id         BIGINT PRIMARY KEY,
  name       VARCHAR(128) NOT NULL,
  plan       VARCHAR(32) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE users (
  id         BIGINT PRIMARY KEY,
  org_id     BIGINT NOT NULL REFERENCES organizations(id),
  email      VARCHAR(255) NOT NULL UNIQUE,
  role       VARCHAR(32) NOT NULL
);

CREATE TABLE subscriptions (
  id         BIGINT PRIMARY KEY,
  org_id     BIGINT NOT NULL REFERENCES organizations(id),
  stripe_id  VARCHAR(128) NOT NULL UNIQUE,
  status     VARCHAR(32) NOT NULL,
  ends_at    TIMESTAMP
);

CREATE TABLE features (
  id         BIGINT PRIMARY KEY,
  key        VARCHAR(64) NOT NULL UNIQUE,
  is_active  BOOLEAN NOT NULL
);

CREATE TABLE org_features (
  org_id     BIGINT NOT NULL REFERENCES organizations(id),
  feature_id BIGINT NOT NULL REFERENCES features(id),
  enabled    BOOLEAN NOT NULL,
  PRIMARY KEY (org_id, feature_id)
);`
};
