# Vérification en lecture seule de la version actuelle

## Contrôles

1. Lancer `bun run build` sur la version actuelle et relever précisément le résultat, sans modifier les fichiers.
2. Tester la page d’accueil avec Playwright en viewport mobile 390 × 844 :
   - faire défiler jusqu’à la section `#cartes-nfc` ;
   - constater l’état visible ou masqué de la barre fixe « Décrire mon projet » avant, pendant et après la section ;
   - mesurer la largeur de la section et de ses descendants pour détecter tout débordement horizontal ;
   - confirmer visuellement que les prix « 29,90 € » et « 39,90 € » restent entièrement lisibles.
3. Tester rapidement la même page à 1280 px de large pour vérifier la section NFC, les prix, l’absence de débordement et l’intégrité générale du rendu.
4. Fournir uniquement les résultats observés, en distinguant clairement les contrôles réussis des éventuels problèmes. Aucune correction ne sera appliquée.

## Détails techniques

- Les contrôles viseront `http://localhost:8080`, qui reflète la version courante du projet.
- Des captures temporaires pourront être prises hors du projet pour confirmer le rendu.
- Aucun fichier source, réglage, dépendance ou donnée ne sera modifié.
