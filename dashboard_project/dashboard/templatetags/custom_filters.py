from django import template

register = template.Library()

@register.filter
def currency(value):
    """Format numbers as currency (e.g., 12450 -> $12,450.00)"""
    try:
        value = float(value)  # Ensure it's a number
        return "₱{:,.2f}".format(value)
    except ValueError:
        return value  # Return original if conversion fails
