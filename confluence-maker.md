```markdown
---
name: confluence-wiki-maker
description: Generate professional Confluence wiki markup documents for Confluence Server and Data Center (versions 5.x - 10.x). Use when the user requests to create Confluence pages, wiki documentation, technical guides, project reports, or any content that needs to be formatted using Confluence wiki markup syntax. Supports advanced formatting with panels, macros (info, warning, tip, note, toc, code, expand, status), tables, layouts (sections/columns), and color schemes. Ideal for creating templates, onboarding guides, project documentation, technical specifications, weekly updates, and status reports.
---

# Confluence Wiki Maker

Professional Confluence layouts with clean visual structure and refined styling for Confluence Server/Data Center.

## Core Design Principles

**Clean Layout Philosophy:**
- Vertical flow - content reads top to bottom
- Strategic white space - let content breathe  
- Minimal panels - use only for key highlights (max 1-2 per doc)
- Tables for structure - organize information clearly
- Refined colors - blue/gray palette with purpose

## Quick Reference

### Essential Macros

```wiki
{toc:maxLevel=2|minLevel=1}                              # Table of contents
{status:colour=Green|title=Complete|subtle=true}         # Status badges
{code:language=python|theme=Confluence}...{code}         # Code blocks
{panel:title=Title|...}...{panel}                       # Panels
{expand:title=Click to expand}...{expand}               # Expandable sections
{info}...{info}                                         # Info boxes
{warning}...{warning}                                   # Warning boxes
{tip}...{tip}                                           # Tip boxes
{note}...{note}                                        # Note boxes
```

### Color Palette

**Primary (90% usage):**
- Deep Blue: `#2c5282` (headers, primary borders)
- Medium Gray: `#4a5568` (secondary elements)
- Light Gray: `#f7fafc` (backgrounds)
- Lighter Gray: `#e2e8f0` (subtle borders)

**Accent (10% usage):**
- Success Green: `#38a169`
- Caution Orange: `#dd6b20`

## Visual Elements

### Panels (Use Sparingly - Max 1-2)

**Standard panel for key highlights:**
```wiki
{panel:title=Overview|titleBGColor=#2c5282|titleColor=#ffffff|bgColor=#f7fafc|borderColor=#2c5282|borderWidth=1}
Key content that deserves special attention
{panel}
```

**Borderless panel for subtle grouping:**
```wiki
{panel:bgColor=#f7fafc|borderWidth=0}
Subtly grouped content
{panel}
```

### Tables (Primary Layout Tool)

**Standard data table:**
```wiki
|| Header 1 || Header 2 || Header 3 ||
| Cell 1 | Cell 2 | Cell 3 |
| Cell 1 | Cell 2 | Cell 3 |
```

**Status tracking table:**
```wiki
|| Task || Status || Owner || Notes ||
| Task 1 | {status:colour=Green|title=Complete|subtle=true} | Team A | On schedule |
| Task 2 | {status:colour=Yellow|title=In Progress|subtle=true} | Team B | Minor delay |
| Task 3 | {status:colour=Red|title=Blocked|subtle=true} | Team C | Needs review |
```

**Metadata/attribute table:**
```wiki
|| Property || Value ||
| Version | 2.1.0 |
| Last Updated | 2025-01-15 |
| Owner | Engineering Team |
```

### Status Badges

Always use `subtle=true` for professional appearance:

```wiki
{status:colour=Green|title=Active|subtle=true}
{status:colour=Yellow|title=Pending|subtle=true}
{status:colour=Red|title=Critical|subtle=true}
{status:colour=Blue|title=Information|subtle=true}
{status:colour=Grey|title=Archived|subtle=true}
```

### Macros for Information

**Info/Warning/Tip/Note boxes (use instead of multiple panels):**
```wiki
{info:title=Important Information}
Content that users should be aware of
{info}

{warning:title=Caution Required}
Content requiring careful attention
{warning}

{tip:title=Best Practice}
Helpful suggestions and recommendations
{tip}

{note:title=Additional Context}
Supplementary information
{note}
```

## Document Templates

### Template 1: Executive Summary

```wiki
h1. [Document Title]

{panel:title=Executive Summary|titleBGColor=#2c5282|titleColor=#ffffff|bgColor=#f7fafc|borderColor=#2c5282|borderWidth=1}
High-level overview in 2-3 sentences
{panel}

----

h2. Key Metrics

|| Metric || Current || Target || Status ||
| Metric 1 | Value | Target | {status:colour=Green|title=On Track|subtle=true} |
| Metric 2 | Value | Target | {status:colour=Yellow|title=At Risk|subtle=true} |

----

h2. Highlights

* Point 1 with clear business impact
* Point 2 with measurable outcome
* Point 3 with strategic alignment

----

h2. Next Steps

|| Action || Owner || Due Date ||
| Action item 1 | Name | Date |
| Action item 2 | Name | Date |
```

### Template 2: Technical Documentation

```wiki
h1. [Technical Component Name]

{toc:maxLevel=2|minLevel=1}

----

h2. Overview

Brief description of the component and its purpose.

----

h2. Architecture

|| Component || Technology || Purpose ||
| Frontend | React 18 | User interface |
| Backend | Spring Boot | Business logic |
| Database | PostgreSQL | Data persistence |

----

h2. Configuration

{code:language=yaml|theme=Confluence}
# Configuration example
property:
  key: value
  nested:
    item: detail
{code}

----

h2. API Reference

|| Endpoint || Method || Description ||
| /api/resource | GET | Retrieve resources |
| /api/resource | POST | Create resource |
| /api/resource/{id} | PUT | Update resource |

----

h2. Deployment

{info:title=Deployment Notes}
Critical information for deployment process
{info}

Steps for deployment...
```

### Template 3: Project Status Report

```wiki
h1. [Project Name] - Status Report

|| Report Date || Project Phase || Overall Status ||
| [Date] | [Phase] | {status:colour=Green|title=On Track|subtle=true} |

----

h2. Executive Summary

{panel:bgColor=#f7fafc|borderColor=#2c5282|borderWidth=1}
Brief project status overview and key achievements
{panel}

----

h2. Progress This Period

|| Deliverable || Status || Completion ||
| Deliverable 1 | {status:colour=Green|title=Complete|subtle=true} | 100% |
| Deliverable 2 | {status:colour=Yellow|title=In Progress|subtle=true} | 75% |
| Deliverable 3 | {status:colour=Blue|title=Planned|subtle=true} | 0% |

----

h2. Risks and Issues

{warning:title=Active Risks}
|| Risk || Impact || Mitigation ||
| Risk description | High/Medium/Low | Mitigation strategy |
{warning}

----

h2. Next Period Focus

* Priority 1 with expected outcome
* Priority 2 with success criteria
* Priority 3 with dependencies
```

### Template 4: Meeting Notes

```wiki
h1. [Meeting Title] - [Date]

|| Attendees || Date || Duration ||
| Name1, Name2, Name3 | [Date] | [Duration] |

----

h2. Agenda

# Item 1 - Topic
# Item 2 - Topic  
# Item 3 - Topic

----

h2. Discussion

h3. Topic 1

Key points discussed and context.

*Decision:* {status:colour=Green|title=Approved|subtle=true}

h3. Topic 2

Details of discussion.

*Action Required:* {status:colour=Yellow|title=Pending|subtle=true}

----

h2. Action Items

|| Action || Owner || Due Date || Status ||
| Action description | Name | Date | {status:colour=Blue|title=Assigned|subtle=true} |
| Action description | Name | Date | {status:colour=Blue|title=Assigned|subtle=true} |

----

h2. Next Meeting

Date, time, and planned agenda items.
```

## Advanced Features

### Expandable Sections

```wiki
{expand:title=Click to view details}
Hidden content that expands when clicked.
Useful for supplementary information.
{expand}
```

### Code Blocks with Syntax Highlighting

```wiki
{code:language=python|theme=Confluence|linenumbers=true|title=example.py}
def process_data(data):
    """Process the input data."""
    return processed_data
{code}
```

Supported languages: python, java, javascript, typescript, sql, yaml, json, xml, bash, powershell

### Section/Column Layouts

```wiki
{section}
{column:width=50%}
Left column content
{column}
{column:width=50%}
Right column content
{column}
{section}
```

## Best Practices

### DO:
- Start with h1 for title (use once)
- Use h2 for major sections (3-7 typical)
- Apply horizontal rules (----) between major sections
- Keep tables under 6 columns
- Use subtle status badges always
- Apply single consistent color scheme
- Maintain generous white space
- Use tables for structured data
- Include TOC for documents >3 sections

### DON'T:
- Nest panels within panels
- Use more than 2 panels per document
- Create side-by-side layouts (prefer vertical)
- Mix multiple color schemes
- Use bold status badges
- Overuse text formatting
- Create tables wider than 6 columns
- Skip section separators

## Output Guidelines

When generating Confluence wiki markup:

1. **Start with structure** - Define h1 title and h2 sections
2. **Add key highlight** - Single panel if needed for executive summary
3. **Organize with tables** - Use for all structured data
4. **Apply consistent styling** - Blue/gray palette throughout
5. **Include navigation** - TOC for longer documents
6. **Separate sections** - Horizontal rules between major parts
7. **Keep it clean** - Minimal formatting, maximum clarity

## Common Patterns

### Status Dashboard Pattern
```wiki
h1. Dashboard Title

|| Category || Status || Trend || Notes ||
| Performance | {status:colour=Green|title=Good|subtle=true} | ↑ | Improving |
| Security | {status:colour=Yellow|title=Warning|subtle=true} | → | Stable |
| Compliance | {status:colour=Green|title=Pass|subtle=true} | ↑ | All checks passed |
```

### Process Documentation Pattern
```wiki
h1. Process Name

h2. Step 1: [Action]

{info}
Prerequisites and important notes
{info}

Detailed instructions...

h2. Step 2: [Action]

Instructions continue...

h2. Validation

|| Check || Expected Result ||
| Check 1 | Result 1 |
| Check 2 | Result 2 |
```

### Comparison Matrix Pattern
```wiki
h1. Comparison Title

|| Feature || Option A || Option B || Option C ||
| Feature 1 | ✓ Supported | ✓ Supported | ✗ Not supported |
| Feature 2 | ✓ Supported | ✗ Not supported | ✓ Supported |
| Feature 3 | ✗ Not supported | ✓ Supported | ✓ Supported |
| *Score* | *2/3* | *2/3* | *2/3* |
```

## Quick Tips

- **Headers**: Use sparingly - h1 once, h2 for sections, h3 for subsections
- **Panels**: Maximum 2 per document, only for critical highlights
- **Tables**: Your primary tool for organizing information
- **Status**: Always subtle=true for professional appearance
- **Colors**: Stick to blue (#2c5282) and gray (#4a5568) palette
- **Macros**: Use info/warning/tip/note instead of multiple panels
- **Code**: Use theme=Confluence for consistent styling
- **White space**: Don't crowd elements - use blank lines and separators

---

*Generate clean, professional Confluence wiki markup with consistent visual hierarchy and refined styling.*
```
