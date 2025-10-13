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
                    author_names.append(i[0])
            author_name = " ".join(author_names)
            author_list.append(author_name)
        article_obj["authors"] = author_list
    return article_obj


# article_info("/Users/zongrunli/Desktop/HomePage/zli867.github.io/publications/1/S1352231022000966.bib")
def generate_html_text(cite_name, image_name, pdf_name, match_name="Zongrun Li"):
    article_obj = article_info(cite_name)
    html_text = """
                    <li>
                        <div class="project-title">
                            %s
                        </div>
                        <br>
                """ % article_obj["title"]
    
    for i in range(0, len(article_obj["authors"])):
        author = article_obj["authors"][i]
        if author == match_name:
            html_text += "<strong>" + match_name + "</strong>"
        else:
            html_text += author
        
        if i != len(article_obj["authors"]) - 1:
            html_text += ", "

    html_text += """
        <em>%s</em>, %s, DOI: <a href="%s">%s</a>
        <br>
        <br>
        <div>
            <img src=%s width="100%%">
        </div>
        <i class="fas fa-quote-left"></i> <a href="%s"> Cite </a> /
        <i class="fas fa-file-pdf\"></i><a href="%s"> PDF</a>
        <br>
        <br>
    </li>
    """% (article_obj["journal"], article_obj["year"], article_obj["doi"], article_obj["doi"], image_name, cite_name, pdf_name)
    soup = bs(html_text)
    html_text = soup.prettify()   
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
    cite_name, image_name, pdf_name = get_filenames(cur_path)
    html_text += generate_html_text(cite_name, image_name, pdf_name)

with open("index_template.html", "r", encoding="utf-8") as f:
    template_html = f.read()

# Replace the placeholder with your string
filled_html = template_html.replace("UPDATE_FIELD_PUBLICATION", html_text)

# Save as index.html
with open("index.html", "w", encoding="utf-8") as f:
    f.write(filled_html)

print("publication updated index.html created successfully!")