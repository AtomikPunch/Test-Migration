@All @Offer
Feature: Offer

  @OF01
  Scenario: Un client peut consulter une page catégorie de niveau 1
    Given J'accede au site web
    And J'accède à la PLP niveau 1 du "produit_disponible"
    Then Je vérifie l'accès à la PLP niveau 1 du "produit_disponible"
    
  @OF02
  Scenario: Un client peut consulter une page catégorie de niveau 2
    Given J'accede au site web
    And J'accède à la PLP niveau 2 du "produit_disponible"
    Then Je vérifie l'accès à la PLP niveau 2 du "produit_disponible"

  @OF05
  Scenario: Un client peut consulter une page produit sans avoir de magasin sélectionné
    Given J'accede à la PDP d'un produit "produit_disponible"
    Then Je verifie que le magasin n'est pas selectionné
    Then Je vérifie l'accès à la PDP

  @OF06
  Scenario: Un client peut consulter une page produit avec un magasin sélectionné
    Given Je vais utiliser un client "avec_un_compte_existant"
    Given J'accede au site web
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "magasin_principal"
    Then Je choisis "magasin_principal" comme magasin favoris
    Given J'accede à la PDP d'un produit "produit_disponible"
    Then Je vérifie l'accès à la PDP

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
