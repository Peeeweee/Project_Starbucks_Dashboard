import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import numpy as np
import shutil

# --- CONFIGURATION ---
DATA_PATH = 'public/data/starbucks_cleaned.csv'
EXPORT_BASE = 'visualizations_export'
S_GREEN = '#006241'
S_LIGHT_GREEN = '#d4e9e2'
S_DARK = '#002B1B'
S_GOLD = '#cba258'
S_FOREST = '#1e3932'

# Clean start
if os.path.exists(EXPORT_BASE):
    shutil.rmtree(EXPORT_BASE)

categories = ['Overview', 'Customers', 'Ordering', 'Visit Times', 'Drinks', 'Spending', 'Quick Facts']
for cat in categories:
    os.makedirs(os.path.join(EXPORT_BASE, cat), exist_ok=True)

df = pd.read_csv(DATA_PATH)

def save(cat, name):
    plt.savefig(os.path.join(EXPORT_BASE, cat, f"{name}.png"), bbox_inches='tight', dpi=150)
    plt.close()
    print(f"Exported: {cat}/{name}.png")

sns.set_theme(style="whitegrid", font_scale=1.1)
day_order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
age_order = ['18-24', '25-34', '35-44', '45-54', '55+']

# --- 1. OVERVIEW ---
print("Generating Overview...")
# Business Momentum (Area Line Chart)
plt.figure(figsize=(10, 5))
daily_counts = df.groupby('day_of_week').size().reindex(day_order)
plt.fill_between(daily_counts.index, daily_counts.values, color=S_GREEN, alpha=0.1)
plt.plot(daily_counts.index, daily_counts.values, marker='o', color=S_GREEN, linewidth=3)
plt.title('Business Momentum', fontweight='bold')
plt.ylim(13000, 15000)
save('Overview', 'Business Momentum')

# Product Leaderboard (Horizontal Bars)
plt.figure(figsize=(10, 6))
top5 = df['drink_category'].value_counts().head(5)
sns.barplot(y=top5.index, x=top5.values, color=S_GREEN)
plt.title('Product Leaderboard', fontweight='bold')
save('Overview', 'Product Leaderboard')

# Loyalty Valuation (Grouped Bar)
plt.figure(figsize=(10, 5))
metrics = ['total_spend', 'customer_satisfaction', 'cart_size']
members = df[df['is_rewards_member'] == True]
non_members = df[df['is_rewards_member'] == False]
loyalty_data = []
for m in metrics:
    loyalty_data.append({'Metric': m, 'Rewards Member': members[m].mean(), 'General Customer': non_members[m].mean()})
# For Order Ahead Rate
loyalty_data.append({
    'Metric': 'Order Ahead Rate', 
    'Rewards Member': (members['order_ahead'] == True).mean() * 100, 
    'General Customer': (non_members['order_ahead'] == True).mean() * 100
})
ldf = pd.DataFrame(loyalty_data)
ldf.set_index('Metric').plot(kind='bar', color=[S_GREEN, S_GOLD], ax=plt.gca())
plt.title('Loyalty Valuation', fontweight='bold')
save('Overview', 'Loyalty Valuation')

# --- 2. CUSTOMERS ---
print("Generating Customers...")
# Spending by Age
plt.figure(figsize=(10, 5))
sns.barplot(x='customer_age_group', y='total_spend', data=df, order=age_order, color=S_GREEN)
plt.title('Spending by Age', fontweight='bold')
plt.ylim(13.0, 15.6)
save('Customers', 'Spending by Age')

# Customer Gender
plt.figure(figsize=(7, 7))
g_counts = df['customer_gender'].value_counts()
plt.pie(g_counts, labels=g_counts.index, autopct='%1.1f%%', colors=[S_GREEN, '#2E1A12'], startangle=90)
plt.title('Customer Gender', fontweight='bold')
save('Customers', 'Customer Gender')

# Favorite Drinks by Group
plt.figure(figsize=(12, 6))
df.groupby(['drink_category', 'customer_gender']).size().unstack().plot(kind='bar', color=[S_GREEN, S_GOLD], ax=plt.gca())
plt.title('Favorite Drinks by Group', fontweight='bold')
save('Customers', 'Favorite Drinks by Group')

# Orders by Region
plt.figure(figsize=(10, 5))
sns.countplot(x='region', data=df, color=S_DARK)
plt.title('Orders by Region', fontweight='bold')
save('Customers', 'Orders by Region')

# --- 3. ORDERING ---
print("Generating Ordering...")
# Types of Drinks People Buy
plt.figure(figsize=(12, 5))
sns.countplot(x='drink_category', data=df, color=S_GREEN, order=df['drink_category'].value_counts().index)
plt.title('Types of Drinks People Buy', fontweight='bold')
save('Ordering', 'Types of Drinks People Buy')

# Rewards Members vs. Regular Customers
rdf = pd.DataFrame([
    {'Metric': 'Avg Spend', 'Members': members['total_spend'].mean(), 'NonMembers': non_members['total_spend'].mean()},
    {'Metric': 'Avg Satisfaction', 'Members': members['customer_satisfaction'].mean(), 'NonMembers': non_members['customer_satisfaction'].mean()}
])
rdf.set_index('Metric').plot(kind='barh', color=[S_GREEN, S_GOLD], ax=plt.gca())
plt.title('Rewards Members vs. Regular Customers', fontweight='bold')
save('Ordering', 'Rewards Members vs. Regular Customers')

# Extra Toppings vs. Price (Gold Bars)
plt.figure(figsize=(10, 5))
sns.barplot(x='num_customizations', y='total_spend', data=df, color=S_GOLD)
plt.title('Extra Toppings vs. Price', fontweight='bold')
plt.ylim(12, 24)
save('Ordering', 'Extra Toppings vs. Price')

# --- 4. VISIT TIMES ---
print("Generating Visit Times...")
# Daily Orders
plt.figure(figsize=(10, 5))
sns.countplot(x='day_of_week', data=df, order=day_order, color=S_GREEN)
plt.title('Daily Orders', fontweight='bold')
save('Visit Times', 'Daily Orders')

# Busiest Times of Day
def get_slot(time_str):
    if not isinstance(time_str, str): return 'Night'
    hour = int(time_str.split(':')[0])
    if 5 <= hour < 12: return 'Morning'
    if 12 <= hour < 17: return 'Afternoon'
    if 17 <= hour < 21: return 'Evening'
    return 'Night'
df['time_slot'] = df['order_time'].apply(get_slot)
plt.figure(figsize=(10, 5))
sns.countplot(x='time_slot', data=df, order=['Morning', 'Afternoon', 'Evening', 'Night'], color=S_FOREST)
plt.title('Busiest Times of Day', fontweight='bold')
save('Visit Times', 'Busiest Times of Day')

# Average Amount Spent Each Day
plt.figure(figsize=(12, 5))
daily_spend = df.groupby('day_of_week')['total_spend'].mean().reindex(day_order)
plt.plot(daily_spend.index, daily_spend.values, marker='o', color=S_GREEN, linewidth=4)
plt.title('Average Amount Spent Each Day', fontweight='bold')
save('Visit Times', 'Average Amount Spent Each Day')

# --- 5. DRINKS ---
print("Generating Drinks...")
# Popular Drink Types
plt.figure(figsize=(10, 5))
top6_drinks = df['drink_category'].value_counts().head(6)
sns.barplot(x=top6_drinks.index, y=top6_drinks.values, color=S_DARK)
plt.title('Popular Drink Types', fontweight='bold')
plt.ylim(15000, 17000)
save('Drinks', 'Popular Drink Types')

# Top 10 Best Sellers
plt.figure(figsize=(12, 8))
top10 = df['drink_category'].value_counts().head(10)
sns.barplot(y=top10.index, x=top10.values, color=S_GREEN)
plt.title('Top 10 Best Sellers', fontweight='bold')
save('Drinks', 'Top 10 Best Sellers')

# How People Order Ahead
plt.figure(figsize=(10, 5))
order_ahead_rate = df.groupby('order_channel')['order_ahead'].mean() * 100
sns.barplot(x=order_ahead_rate.index, y=order_ahead_rate.values, color=S_GOLD)
plt.title('How People Order Ahead', fontweight='bold')
save('Drinks', 'How People Order Ahead')

# --- 6. SPENDING ---
print("Generating Spending...")
# Average Spend by Age
plt.figure(figsize=(10, 5))
sns.barplot(x='customer_age_group', y='total_spend', data=df, order=age_order, color=S_GREEN)
plt.title('Average Spend by Age', fontweight='bold')
save('Spending', 'Average Spend by Age')

# Spending by Where People Live
plt.figure(figsize=(10, 5))
sns.barplot(x='store_location_type', y='total_spend', data=df, color=S_FOREST)
plt.title('Spending by Where People Live', fontweight='bold')
save('Spending', 'Spending by Where People Live')

# How Extra Toppings Change the Price
plt.figure(figsize=(12, 5))
cust_spend = df.groupby('num_customizations')['total_spend'].mean()
plt.plot(cust_spend.index, cust_spend.values, marker='o', color='#D4AF37', linewidth=4)
plt.title('How Extra Toppings Change the Price', fontweight='bold')
save('Spending', 'How Extra Toppings Change the Price')

# --- 7. QUICK FACTS ---
print("Generating Quick Facts...")
# Average Spend by Age (Duplicated as requested)
plt.figure(figsize=(10, 5))
sns.barplot(x='customer_age_group', y='total_spend', data=df, order=age_order, color=S_GREEN)
plt.title('Average Spend by Age', fontweight='bold')
save('Quick Facts', 'Average Spend by Age')

# How People Order (Pie Chart)
plt.figure(figsize=(7, 7))
counts = df['order_channel'].value_counts()
plt.pie(counts, labels=counts.index, autopct='%1.1f%%', colors=[S_GREEN, S_FOREST, S_GOLD])
plt.title('How People Order', fontweight='bold')
save('Quick Facts', 'How People Order')

# Executive Summary KPIs
kpis = {
    'Total Revenue': f"${df['total_spend'].sum():,.0f}",
    'Avg Satisfaction': f"{df['customer_satisfaction'].mean():.2f}/5",
    'Rewards %': f"{(df['is_rewards_member'].sum()/len(df))*100:.1f}%",
    'Top Region': df['region'].mode()[0],
}
plt.figure(figsize=(8, 4))
plt.axis('off')
kpi_text = "\n".join([f"{k}: {v}" for k, v in kpis.items()])
plt.text(0.5, 0.5, kpi_text, ha='center', va='center', fontsize=20, fontweight='bold', color=S_DARK, bbox=dict(facecolor=S_LIGHT_GREEN, alpha=0.5))
plt.title('Executive Summary KPIs', fontweight='bold')
save('Quick Facts', 'Executive Summary KPIs')

print("Final cleanup and validation...")
print("All requested visualizations are complete!")
