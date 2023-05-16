@All @Checkout
Feature: Checkout

  @CO01 
  Scenario: Un client est redirigé vers l'identification puis revient vers la page de livraison après authentification​
    Given Je vais utiliser un client "avec_un_compte_existant"
    And J'accede au site web
    And Je me connecte
    Then Je vide le panier en utilisant une API
    Then Je me deconnecte
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And J'accède au panier depuis la pop-up
    And J'accede au checkout
    And Je remplis le formulaire de connection
    And Je soumets le formulaire de connection 
    When Je vérifie que la page de livraison est visible
