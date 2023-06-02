@All @Cart
Feature: Cart

  @CA001
  Scenario: Le panier est correctement recalculer lorsque j'ajoute un produit alors une offre promotionelle s'applique
    Given J'accede à la PDP d'un produit "produit_disponible"
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "magasin_avec_promotion"
    Then Je choisis "magasin_avec_promotion" comme magasin favoris
    And J'ajoute le produit au panier en selectionnant l'option click and collect
    And J'accède au panier depuis la pop-up
    Then Je vérifie la promotion du produit "produit_disponible"

  @CA02
  Scenario: Le panier est correctement recalculer lorsque je change de magasin alors un produit devenu indisponible est supprimé
    Given J'accede à la PDP d'un produit "indisponible_en_click_and_collect"
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "magasin_principal"
    Then Je choisis "magasin_principal" comme magasin favoris
    And J'ajoute le produit au panier en selectionnant l'option click and collect
    And J'accède au panier depuis la pop-up
    And J'accède au choix du magasin a partir du header
    And Je change de magasin
    Then Je remplis la recherche de magasin avec "produit_non_disponible"
    And Je choisis "produit_non_disponible" comme magasin favoris
    Then Je vérifie que la panier soit vide

  @CA03
  Scenario: Le panier est correctement recalculer lorsque je change de magasin alors le prix du nouveau magasin s'applique
    Given J'accede à la PDP d'un produit "produit_changeant_de_prix"
    And J'accède au choix du magasin a partir du header
    Then Je remplis la recherche de magasin avec "magasin_principal"
    Then Je choisis "magasin_principal" comme magasin favoris
    And J'ajoute le produit au panier en selectionnant l'option click and collect
    And J'accède au panier depuis la pop-up
    And J'accède au choix du magasin a partir du header
    And Je change de magasin
    Then Je remplis la recherche de magasin avec "magasin_avec_différent_prix"
    And Je choisis "magasin_avec_différent_prix" comme magasin favoris
    Then Je vérifie le changement de prix du produit "produit_changeant_de_prix" grâce au changement de magasin

  @CA004
  Scenario: Le panier est correctement recalculer lorsque je change d'option de livraison/retrait alors les nouveaux frais d'expédition s'appliquent au total panier
    Given Je vais utiliser un client "avec_un_compte_existant"
    Given J'accede à la PDP d'un produit "disponible_en_livraison"
    And Je choisis le magasin "magasin_principal" depuis le header
    And J'ajoute le produit au panier en selectionnant l'option de livraison à domicile
    And J'accède au panier depuis la pop-up
    And Je choisis l'option "home_delivery"
    Then Je vérifie le changement du prix total du panier "disponible_en_livraison"