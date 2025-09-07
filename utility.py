from scholarly import scholarly
import bibtexparser

def correct_citation(bibtex_str):
    # Parse the input BibTeX
    bib_database = bibtexparser.loads(bibtex_str)
    title = bib_database.entries[0].get("title", "").strip('{}')

    print(f"Searching Google Scholar for: {title}")
    search_query = scholarly.search_pubs(title)

    try:
        # Get first result
        pub = next(search_query)
        bibtex_result = scholarly.bibtex(pub)
        print("\n✅ Corrected BibTeX:\n")
        print(bibtex_result)
    except StopIteration:
        print("❌ No results found on Google Scholar.")
    except Exception as e:
        print(f"⚠️ Error: {e}")

# Example (incorrect) BibTeX string
incorrect_bibtex = """
@book{RN1249,
   author = {Pratt, K. A. and Murphy, S. M. and Subramanian, R. and Demott, P. J. and Kok, G. L. and Campos, T. and Rogers, D. C. and Prenni, A. J. and Heymsfield, A. J. and Seinfeld, J. H. and Prather, K. A.},
   title = {Flight-based chemical characterization of biomass burning aerosols within two prescribed burn smoke plumes},
   publisher = {Atmospheric Chemistry and Physics},
   year = {2011},
   type = {Book}
}
"""

# Run the correction
correct_citation(incorrect_bibtex)
