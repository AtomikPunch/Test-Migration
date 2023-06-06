const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor");
const { productPage } = require("../../src/pages/productPage");


Then("Je filtre par prix maximum", () => {cy.i_filter_by_max_price('maximum');})
Cypress.Commands.add('i_filter_by_max_price', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_max_price");
        bag.pages.list.filter.click();
        bag.pages.list.max_price_filter.type(filter.option).type('{enter}');
    });
});

Then("Je filtre par prix minimum", () => {cy.i_filter_by_min_price('minimum');})
Cypress.Commands.add('i_filter_by_min_price', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_min_price");
        bag.pages.list.min_price_filter.type(filter.option).type('{enter}');
    });
});

Then("Je filtre par marque {string}", (filterBy_reference) => {cy.i_filter_by_brand(filterBy_reference);})
Cypress.Commands.add('i_filter_by_brand', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_brand");
        bag.pages.list.filter.then($button => {
            if($button.is(':visible'))
            {
                bag.pages.list.filter.click();
            }
        })
        bag.pages.list.brand_list.click();
        cy.get('[id*=' + filter.option + ']+.checkbox-frame').click();
    });
});

Then("Je verifie la présence du filtre {string}", (filter_reference) => {cy.i_verify_filter_tag_added(filter_reference);})
Cypress.Commands.add('i_verify_filter_tag_added', (filter_reference) => {
    cy.get("@bag").then((bag) => {
        let filter_selected = bag.data.FilterBy[filter_reference];
        cy.log("i_verify_filter_tag_added");
        bag.pages.list.filter_tag.contains(filter_selected.option);
    });
});

Cypress.Commands.add("i_search_a_product", (product_reference) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_search_a_product");
        let product = bag.data.product.existing_product[product_reference];
        bag.pages.home.search_bar.type(product)
        bag.pages.home.research_button.click();
    });
})

Cypress.Commands.add("i_verify_product_in_PLP", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_reference];
        cy.log("i_verify_product_in_PLP");
        while (cy.get(`[href*="${product.id}"]`).should('be.visible').then(isVisible => !isVisible)) {
            bag.pages.list.see_more_product.should('be.visible').click();
          }
    });
});

Then("Je cherche un produit {string} en utilisant son unité de besoin",(product_reference) => {cy.i_search_a_product_using_its_name(product_reference);})
Cypress.Commands.add("i_search_a_product_using_its_name", (product_reference) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_search_a_product");
        let product = bag.data.products[product_reference];
        bag.pages.home.search_bar.type(product.name).type('{enter}')
    });
})

Then("Je cherche un produit {string} en utilisant sa marque",(product_reference) => {cy.i_search_a_product_using_its_brand(product_reference);})
Cypress.Commands.add("i_search_a_product_using_its_brand", (product_reference) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_search_a_product");
        let product = bag.data.products[product_reference];
        bag.pages.home.search_bar.type(product.brand).type('{enter}')
    });
})

Then("Je verifie la présence du produit {string} dans la PLP", (product_reference) => { cy.i_verify_product_in_PLP(product_reference);})
Cypress.Commands.add("i_verify_product_in_PLP", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        cy.wait(3000);
            bag.pages.list.product_list.then($body => {
            if ($body.find("#" + product.id).length > 0) {   
                //evaluates as true if button exists at all
                bag.pages.list.product_in_PLP(product.id).then($element => {
                if ($element.is(':visible')){
                    cy.log("element is visible and exist")
                    }
                });
                } else {
                    cy.log("element is not visible and doesn't exist")
                    bag.pages.list.see_more_product.scrollIntoView().click();
                    cy.wait(5000);
                    cy.i_verify_product_in_PLP(product_reference);
                    assert.isOk('everything','everything is OK');
                }
            });
        
        })
    });

Then("J'accède à la PLP niveau 1 du {string}", (product_reference) => {cy.i_access_to_PLP_level_1(product_reference);})
Cypress.Commands.add("i_access_to_PLP_level_1", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        bag.pages.commons.navigation_items(product.level_1.category).click();
    })
})

Then("Je vérifie l'accès à la PLP niveau 1 du {string}", (product_reference) => {cy.i_verify_level_1(product_reference);})
Cypress.Commands.add("i_verify_level_1", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        cy.url().should('include', product.level_1.category )
    })
})

Then("J'accède à la PLP niveau 2 du {string}", (product_reference) => {cy.i_access_to_PLP_level_2(product_reference);})
Cypress.Commands.add("i_access_to_PLP_level_2", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        bag.pages.commons.navigation_items(product.level_1.category).trigger('onmouseover');
        bag.pages.commons.navigation_items(product.level_1.category).trigger('mouseenter');
        cy.wait(2000);
        bag.pages.commons.navigation_sub_items(product.level_2.category).click();
    })
})

Then("Je vérifie l'accès à la PLP niveau 2 du {string}", (product_reference) => {cy.i_verify_level_2(product_reference);})
Cypress.Commands.add("i_verify_level_2", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        cy.url().should('include', product.level_2.category )
    })
})

Then("J'accède à la PLP niveau 3 du {string}", (product_reference) => {cy.i_access_to_PLP_level_3(product_reference);})
Cypress.Commands.add("i_access_to_PLP_level_3", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        bag.pages.commons.navigation_items(product.level_1.category).trigger('onmouseover');
        bag.pages.commons.navigation_items(product.level_1.category).trigger('mouseenter');
        cy.wait(2000);
        bag.pages.commons.navigation_sub_items(product.level_2.category).trigger('onmouseover')
        bag.pages.commons.navigation_sub_items(product.level_2.category).trigger('mouseenter')
        cy.wait(3000);
        bag.pages.commons.navigation_sub_sub_items(product.level_3.category).click({force: true});
    })
})

Then("Je vérifie l'accès à la PLP niveau 3 du {string}", (product_reference) => {cy.i_verify_level_3(product_reference);})
Cypress.Commands.add("i_verify_level_3", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        cy.url().should('include', product.level_3.category )
    })
})

Then("Je vérifie les informations de la catégorie {string}", (product_reference) => {cy.i_verify_category_information(product_reference);})
Cypress.Commands.add('i_verify_category_information', (product_reference) => {
    cy.get('@bag').then((bag) => {
        let product = bag.data.categories[product_reference];
        bag.pages.list.header_seo.should('be.visible');
        bag.pages.list.header_seo.should("have.text", product.header_seo);
        bag.pages.list.cta_store_choice.should('be.visible');
    })
})

Then("Je vérifie la possibilité de paginer" , () => {cy.i_verify_pagination_possibility();})
Cypress.Commands.add('i_verify_pagination_possibility', () => {
    cy.get('@bag').then((bag) => {
        bag.pages.list.product_counter.invoke('text').then(number_of_product => {
            bag.pages.list.product_counter.should("have.text", number_of_product);
            bag.pages.list.see_more_product.should('be.visible').click();
            bag.pages.list.product_counter.should("not.have.text", number_of_product);
        }) 
    })
})