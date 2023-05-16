@All @Account
Feature: Account

  @AC01
  Scenario: Un client peut se connecter depuis le header
    Given Je vais utiliser un client "avec_un_compte_existant"
    And J'accede au site web
    When J'accede à la page de connection
    And Je remplis le formulaire de connection
    And Je soumets le formulaire de connection
    Then Je devrais etre connecté

  @AC02
  Scenario: Un client peut se connecter depuis le checkout
    Given Je vais utiliser un client "avec_un_compte_existant"
    And J'accede au site web
    And Je me connecte
    Then Je vide le panier en utilisant une API
    Then Je me deconnecte
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And Je continue mes achats
    And J'accede au panier depuis le header
    And J'accede au checkout
    And Je remplis le formulaire de connection
    And Je soumets le formulaire de connection 

  @AC03
  Scenario: Un client peut créer un compte depuis le header
    Given Je genere un email aléatoire pour un client "sans_compte"
    And Je vais utiliser un client "sans_compte"
    And J'accede au site web
    When J'accede à la page de création de compte
    And Je remplis le formulaire de création de compte
    And Je soumets le formulaire de création de compte
    Then Je devrais etre connecté

  @AC04
  Scenario: Un client peut créer un compte depuis le checkout
    Given Je genere un email aléatoire pour un client "sans_compte"
    And Je vais utiliser un client "sans_compte"
    And J'accede au site web
    And J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And Je continue mes achats
    And J'accede au panier depuis le header
    And J'accede au checkout
    When Je choisis de créer un compte depuis le checkout
    And Je remplis le formulaire de création de compte
    And Je soumets le formulaire de création de compte