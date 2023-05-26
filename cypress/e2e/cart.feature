@All @Cart
Feature: Cart

  @CA001
  Scenario: Le panier est correctement recalculer lorsque j'ajoute un produit alors une offre promotionelle s'applique
    Given J'accede à la PDP d'un produit "produit_disponible"
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "magasin_avec_promotion"
    Then Je choisi "magasin_avec_promotion" comme magasin favoris
    And J'ajoute le produit au panier en selectionnant l'option click and collect
    And J'accède au panier depuis la pop-up
    Then Je vérifie la promotion du produit "produit_disponible"

