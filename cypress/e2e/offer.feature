@All @Offer
Feature: Offer

  @OF07
  Scenario: Un client peut rechercher un produit via l'unité de besoin
  Given J'accede au site web
  And Je cherche un produit "produit_disponible" en utilisant son unité de besoin
  Then Je verifie la présence du produit "produit_disponible" dans la PLP