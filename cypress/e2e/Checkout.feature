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

  @CO08
  Scenario: Un client peut régler sa commande en CB 3DS
   Given Je vais utiliser un client "avec_un_compte_existant"
    And J'accede au site web
    And Je me connecte
    Then Je vide le panier en utilisant une API
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And J'accède au panier depuis la pop-up
    And J'accede au checkout
    When Je vérifie que la page de livraison est visible
    Then Je remplis le forulaire de payment en utilisant la carte "3DS_frictionless"
    Then Je paie ma commande

  @CO09
  Scenario: Un client obtient la confirmation de sa commande dans le tunnel d'achat
    Given Je vais utiliser un client "getnada_client"
    And J'accede au site web
    And Je me connecte
    Then Je vide le panier en utilisant une API
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And Je continue mes achats
    And J'accede au panier depuis le header
    And J'accede au checkout
    When Je vérifie que la page de livraison est visible
    Then Je remplis le forulaire de payment en utilisant la carte "3DS_frictionless"
    Then Je paie ma commande
    Then Je reçois la confirmation de ma commande sur le site

  @CO10
  Scenario: Un client obtient la confirmation de sa commande par email
    Given Je vais utiliser un client "getnada_client"
    And J'accede au site web
    And Je me connecte
    Then Je vide le panier en utilisant une API
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And Je continue mes achats
    And J'accede au panier depuis le header
    And J'accede au checkout
    When Je vérifie que la page de livraison est visible
    Then Je remplis le forulaire de payment en utilisant la carte "3DS_frictionless"
    Then Je paie ma commande
    Then Je reçois la confirmation de ma commande sur le site
    Then Je vérifie la réception de l'email en utilisant une API
