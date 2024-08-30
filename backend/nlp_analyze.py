import sys
import spacy
import json

# Load spaCy's English language model
nlp = spacy.load('en_core_web_sm')

def extract_skills(text):
    # Process the job description with spaCy
    doc = nlp(text)
    skills = []

    # Example skill extraction logic based on noun chunks and entities
    for chunk in doc.noun_chunks:
        skills.append(chunk.text)

    # Remove duplicates
    skills = list(set(skills))
    return skills

if __name__ == "__main__":
    description = sys.argv[1]
    skills = extract_skills(description)
    # Convert the skills list to a JSON string and print it
    print(json.dumps(skills))

### With Pattern matching
# import sys
# import spacy
# import json
# from spacy.matcher import Matcher

# # Load spaCy's English language model
# nlp = spacy.load('en_core_web_sm')
# matcher = Matcher(nlp.vocab)

# # Define custom patterns for skills (e.g., "Python", "JavaScript", "experience in")
# patterns = [
#     {"label": "SKILL", "pattern": [{"LOWER": "experience"}, {"LOWER": "in"}]},
#     {"label": "SKILL", "pattern": [{"IS_TITLE": True}]},  # To capture skills written as titles (e.g., "Python")
#     {"label": "SKILL", "pattern": [{"LOWER": {"IN": ["python", "javascript", "typescript", "node.js", "react"]}}]},
# ]

# # Add patterns to the matcher
# for pattern in patterns:
#     matcher.add(pattern["label"], [pattern["pattern"]])

# def extract_skills(text):
#     # Process the job description with spaCy
#     doc = nlp(text)
#     skills = set()

#     # Apply the matcher to the doc
#     matches = matcher(doc)
#     for match_id, start, end in matches:
#         skills.add(doc[start:end].text)

#     # Further filter skills based on common patterns and known skills
#     filtered_skills = set()
#     known_skills = {'python', 'javascript', 'typescript', 'node.js', 'react', 'quality assurance', 'test planning', 'software development'}

#     for skill in skills:
#         skill_lower = skill.lower()
#         if skill_lower in known_skills:
#             filtered_skills.add(skill)
#         elif 'experience' in skill_lower or 'proficiency' in skill_lower:
#             filtered_skills.add(skill)

#     return list(filtered_skills)

# if __name__ == "__main__":
#     description = sys.argv[1]
#     skills = extract_skills(description)
#     print(json.dumps(skills))
