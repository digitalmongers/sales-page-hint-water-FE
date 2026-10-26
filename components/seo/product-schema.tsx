import React from "react";

export function ProductSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hintwater.com/#organization",
        "name": "Hint Water",
        "url": "https://hintwater.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hintwater.com/images/peachRaspberry.svg",
          "caption": "Hint Water Logo"
        },
        "sameAs": [
          "https://www.facebook.com/hintwater",
          "https://twitter.com/hintwater",
          "https://www.instagram.com/hint"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://hintwater.com/#website",
        "url": "https://hintwater.com",
        "name": "Hint Water",
        "description": "Pure crisp water infused with real fruit essences. 0 Sugar, 0 Diet Sweeteners, 0 Calories.",
        "publisher": {
          "@id": "https://hintwater.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://hintwater.com/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hintwater.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Beverages",
            "item": "https://hintwater.com/#beverages"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Flavored Still Water",
            "item": "https://hintwater.com/#still-water"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Hint® Peach Raspberry Fruit Infused Water"
          }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://hintwater.com/#product-peach-raspberry",
        "name": "Hint® Fruit Infused Water - Peach Raspberry",
        "description": "Crisp, purified still water infused with real peach and raspberry fruit essences. 0 sugar, 0 calories, 0 diet sweeteners, vegan, gluten-free, and kosher.",
        "image": [
          "https://hintwater.com/images/peachRaspberry.svg",
          "https://hintwater.com/images/watermelon.webp",
          "https://hintwater.com/images/blackberry.webp",
          "https://hintwater.com/images/coconut.webp",
          "https://hintwater.com/images/pineapple.webp"
        ],
        "sku": "HINT-PR-12PK",
        "gtin14": "00842795000018",
        "brand": {
          "@type": "Brand",
          "name": "Hint"
        },
        "category": "Food & Beverage > Beverages > Water > Flavored Water",
        "offers": [
          {
            "@type": "Offer",
            "name": "12-Pack (16 oz bottles)",
            "sku": "HINT-PR-12PK",
            "price": "22.99",
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://hintwater.com",
            "seller": {
              "@id": "https://hintwater.com/#organization"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0.00",
                "currency": "USD"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "US"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 2,
                  "unitCode": "d"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 2,
                  "maxValue": 5,
                  "unitCode": "d"
                }
              }
            }
          },
          {
            "@type": "Offer",
            "name": "24-Pack (Best Value)",
            "sku": "HINT-PR-24PK",
            "price": "43.99",
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://hintwater.com"
          },
          {
            "@type": "Offer",
            "name": "36-Pack (Family Bundle)",
            "sku": "HINT-PR-36PK",
            "price": "62.99",
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://hintwater.com"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "3420",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Emily Carter"
            },
            "datePublished": "2026-10-18",
            "reviewBody": "I love the subtle fruit flavor. It makes drinking water throughout the day so much more enjoyable without being overly sweet.",
            "name": "My new everyday drink",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Olivia Bennett"
            },
            "datePublished": "2026-10-15",
            "reviewBody": "Peach raspberry is such a refreshing combination. I keep a few bottles in the fridge at all times.",
            "name": "Refreshing and delicious",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
