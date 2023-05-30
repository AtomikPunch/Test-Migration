@All @Shop
Feature: Shop

  @SH01
  Scenario: Un client peut rechercher un magasin depuis le header
    Given J'accede au site web
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "Groslay"

  @SH02
  Scenario: Un client peut rechercher un magasin depuis la PDP
    Given J'accede à la PDP d'un produit "disponible_en_livraison"
    And J'accède au choix du magasin à partir de la PDP
    Then Je remplis la recherche de magasin avec "Groslay"

  @SH03
  Scenario: Un client peut rechercher un magasin depuis la PLP
    Given J'accède à la PLP "categorie_standard"
    And J'accède au choix du magasin à partir de la PLP
    Then Je remplis la recherche de magasin avec "Groslay"

  @SH04
  Scenario: Un client peut sélectionner un magasin favoris depuis le header
    Given J'accede au site web
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "Groslay"
    Then Je choisis "Groslay" comme magasin favoris

  @SH05
  Scenario: Un client peut sélectionner un magasin favoris depuis la PDP
    Given J'accede à la PDP d'un produit "disponible_en_livraison"
    And J'accède au choix du magasin à partir de la PDP
    Then Je remplis la recherche de magasin avec "Groslay"
    Then Je choisis "Groslay" comme magasin favoris

  @SH06
  Scenario: Un client peut sélectionner un magasin favoris depuis la PLP
    Given J'accède à la PLP "categorie_standard"
    And J'accède au choix du magasin à partir de la PLP
    Then Je remplis la recherche de magasin avec "Groslay"
    Then Je choisis "Groslay" comme magasin favoris