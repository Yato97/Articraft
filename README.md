# Articraft

Lancement : `docker compose up`

## Infos

**Route vers le pannel admin**:
- /commandes
- /stock

Base de données partagée dans `./db/main/` et `./db/users/`

- 3 dockers :
  - Mongodb main (commandes et items)
  - Mongodb users
  - Serveur d'authentification
  - Message brooker (rabbitmq)
  - Articraft website


Works 👍 (50% ????)

ps : voir logs des dockers lors de l'inscription.