@All @Shop
Feature: Shop

  @SH01
  Scenario: Un client peut rechercher un magasin depuis le header
    Given J'accede au site web
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "Groslay"
