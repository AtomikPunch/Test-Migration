@All @Offer
Feature: Offer

  @OF07
  Scenario: Un client peut rechercher un produit via l'unité de besoin
    Given J'accede au site web
    And Je cherche un produit "produit_disponible" en utilisant son unité de besoin
    Then Je verifie la présence du produit "produit_disponible" dans la PLP

  @OF08
  Scenario: Un client peut rechercher un produit via la marque
    Given J'accede au site web
    And Je cherche un produit "produit_disponible" en utilisant sa marque
    Then Je verifie la présence du produit "produit_disponible" dans la PLP

  @OF09
  Scenario: Un client peut filtrer les résultats d'une recherche en sélectionnant un prix max
    Given J'accède à la PLP "categorie_standard"
    And Je filtre par prix maximum
    And Je verifie la présence du filtre "maximum"
    Then Je verifie la présence du produit "produit_disponible" dans la PLP

  @OF10
  Scenario: Un client peut filtrer les résultats d'une recherche en sélectionnant une fourchette de prix
    Given J'accède à la PLP "categorie_standard"
    And Je filtre par prix maximum
    And Je filtre par prix minimum
    Then Je verifie la présence du filtre "maximum"
    And Je verifie la présence du filtre "minimum"
    Then Je verifie la présence du produit "produit_disponible" dans la PLP

  @0F11
  Scenario: Un client peut filtrer les résultats d'une recherche en sélectionnant une marque
    Given J'accède à la PLP "categorie_standard"
    And Je filtre par marque "ECLOZ"
    Then Je verifie la présence du filtre "ECLOZ"
    Then Je verifie la présence du produit "produit_disponible" dans la PLP

  @OF12
  Scenario: Un client peut filtrer les résultats d'une recherche en sélectionnant une marque et une fourchette de prix
    Given J'accède à la PLP "categorie_standard"
    And Je filtre par prix maximum
    And Je filtre par prix minimum
    And Je filtre par marque "ECLOZ"
    Then Je verifie la présence du filtre "maximum"
    And Je verifie la présence du filtre "minimum"
    And Je verifie la présence du filtre "ECLOZ"
    Then Je verifie la présence du produit "produit_disponible" dans la PLP
