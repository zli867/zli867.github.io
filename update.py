import numpy as np
from pybtex.database.input import bibtex
import os
import glob
from bs4 import BeautifulSoup as bs

# Update Publications

def article_info(cite_name):
    parser = bibtex.Parser()
    bibdata = parser.parse_file(cite_name)
    article_obj = None
    for bib_id in bibdata.entries:
        b = bibdata.entries[bib_id].fields
        article_obj = {
            "title": b["title"],
            "journal": b["journal"],
            "year": b["year"],
            "doi": b["doi"]
        }
        author_list = []
        for author in bibdata.entries[bib_id].persons["author"]:
            author_names = []
            author_info = [author.first_names, author.middle_names, author.last_names]
            for i in author_info:
                if len(i) > 0:
                    author_names.append(" ".join(i))
            author_name = " ".join(author_names)
            author_list.append(author_name)
        article_obj["authors"] = author_list
    return article_obj


def generate_html_text(cite_name, image_name, pdf_name, folder_number, match_name="Zongrun Li"):
    article_obj = article_info(cite_name)
    year = article_obj["year"]

    # Build author string with highlighting
    author_parts = []
    for i, author in enumerate(article_obj["authors"]):
        if author == match_name:
            author_parts.append("<strong>%s</strong>" % match_name)
        else:
            author_parts.append(author)
    authors_str = ", ".join(author_parts)

    html_text = """
                    <li class="pub-item" data-order="%s" data-year="%s">
                        <div class="pub-thumb"><img src="%s" alt="graphic abstract"/></div>
                        <div class="pub-body">
                            <div class="project-title">%s<span class="pub-year-badge">%s</span></div>
                            <div class="pub-authors">%s</div>
                            <div class="pub-venue"><em>%s</em>, %s, DOI: <a href="%s">%s</a></div>
                            <div class="pub-links"><i class="fas fa-quote-left"></i> <a href="%s">Cite</a> / <i class="fas fa-file-pdf"></i> <a href="%s">PDF</a></div>
                        </div>
                    </li>
    """ % (
        folder_number,
        year,
        image_name,
        article_obj["title"],
        year,
        authors_str,
        article_obj["journal"],
        year,
        article_obj["doi"],
        article_obj["doi"],
        cite_name,
        pdf_name,
    )

    return html_text


def get_filenames(file_path):
    sub_files = glob.glob(os.path.join(file_path, '*'))
    image_name, cite_name, pdf_name = None, None, None
    for sub_file in sub_files:
        if sub_file.endswith('.pdf'):
            pdf_name = sub_file
        elif sub_file.endswith(".bib"):
            cite_name = sub_file
        elif sub_file.endswith('.png') or sub_file.endswith('.jpg') or sub_file.endswith('.jpeg'):
            image_name = sub_file
    return cite_name, image_name, pdf_name


publication_folder_relative = "./publications"
sub_paths = glob.glob(os.path.join(publication_folder_relative, '*'))
sub_folders = [int(sub_path.split("/")[2]) for sub_path in sub_paths]
search_order = [i[0] for i in sorted(enumerate(sub_folders), key=lambda x:x[1], reverse=True)]
html_text = ""
for i in range(0, len(search_order)):
    cur_path = sub_paths[search_order[i]]
    folder_number = sub_folders[search_order[i]]
    cite_name, image_name, pdf_name = get_filenames(cur_path)
    html_text += generate_html_text(cite_name, image_name, pdf_name, folder_number)

with open("index_template.html", "r", encoding="utf-8") as f:
    template_html = f.read()

# Replace the placeholder with your string
filled_html = template_html.replace("UPDATE_FIELD_PUBLICATION", html_text)

# Save as index.html
with open("index.html", "w", encoding="utf-8") as f:
    f.write(filled_html)

print("publication updated index.html created successfully!")
