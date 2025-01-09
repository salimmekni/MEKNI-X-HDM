### README.md

## **HDM Todo List Application**



---

### **Technologies utilisées**
- **Frontend** : React avec TypeScript et Material-UI pour une interface moderne et intuitive.
- **Backend** : NestJS pour sa modularité et sa structure claire.
- **Base de données** : MySQL, avec Prisma pour simplifier la gestion des données.
- **Outils** : Docker pour la base de données, GitHub pour le versionnement, et Prisma pour gérer les migrations.

---

### **Choix techniques et décisions**

#### **1. Organisation du projet**
- J'ai opté pour NestJS côté backend pour sa structure en modules qui permet une séparation claire entre les responsabilités.
- Sur le frontend, React m'a permis de construire une interface utilisateur dynamique et facile à maintenir.
- Prisma a été un excellent choix pour simplifier la connexion et les requêtes vers MySQL.

#### **2. Gestion des tâches (CRUD)**
- Les tâches peuvent être créées, lues, mises à jour et supprimées grâce aux endpoints REST du backend.
- L'utilisation d'une **UseCaseFactory** rend l'application extensible en facilitant l'ajout de nouvelles fonctionnalités sans perturber l'existant.

#### **3. BONUS : Fonctionnalité supplémentaire**
À cause d'une contrainte de temps et de mon emploi chargé avec les cours, je n'ai pas réussi à ajouter la possibilité de marquer une tâche comme terminée :
Un bouton "Terminer" devait permettre de changer l'état d'une tâche.
Les tâches terminées seraient visuellement différenciées des autres.
Cette fonctionnalité aurait enrichi l'expérience utilisateur en ajoutant une gestion simple des statuts des tâches.

---

### **Défis rencontrés et solutions**

#### **1. UseCaseFactory et dépendances**
Certaines erreurs liées à la déclaration des dépendances ont bloqué les fonctionnalités.
**Solution** : J'ai revu les types et l'injection des dépendances pour garantir une compatibilité entre les composants.

#### **2. Synchronisation de la base de données**
Un problème est survenu avec Prisma lors de la synchronisation du schéma avec la base de données.
**Solution** : J'ai réinitialisé les migrations et ajouté des données fictives pour tester l'application.

#### **3. Appels API frontend-backend**
Des erreurs sont apparues à cause de mauvaises configurations des URLs API.
**Solution** : Ajout de la variable `VITE_API_BASE_URL` pour pointer correctement vers le backend depuis le frontend.

#### **4. Validation des données**
Le backend rejetait certaines requêtes en raison d'un manque de validation.
**Solution** : Ajout de validations dans les DTOs (Data Transfer Objects) et contrôle côté backend.
#### **3. Problèmes d'intégration Prettier
Prettier a généré des erreurs de formatage dues à des configurations non adaptées à certaines parties du code. Solution : J'ai corrigé la configuration d'ESLint et Prettier pour mieux aligner les règles sur la structure du projet, et réorganisé certaines lignes de code pour éviter des erreurs de style.

---

### **Instructions pour tester**
1. **Backend** :
   - Configurez le fichier `.env` avec les informations de connexion MySQL.
   - Lancez le backend avec `yarn start:dev`.
   - Testez les endpoints via Postman ou un outil similaire.

2. **Frontend** :
   - Ajoutez la variable `VITE_API_BASE_URL` dans le fichier `.env` pour pointer vers le backend.
   - Lancez le frontend avec `yarn dev`.
   - Accédez à l'application via `http://localhost:5173`.

3. **Base de données** :
   - Synchronisez le schéma avec `npx prisma db push`.
   - Insérez des données test directement via MySQL ou le script fourni.
---

Merci de m'avoir donné cette opportunité, et au plaisir de discuter de ce projet avec vous !
