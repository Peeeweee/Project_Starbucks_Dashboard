import pandas as pd
import numpy as np
import os

# Configuration
INPUT_FILE = r'public/data/starbucks_customer_ordering_patterns.csv'
OUTPUT_FILE = r'public/data/starbucks_cleaned.csv'

def perform_eda(df):
    print("\n" + "="*50)
    print("EXPLORATORY DATA ANALYSIS (RAW)")
    print("="*50)
    print(f"Shape: {df.shape}")
    print("\nColumn Types:")
    print(df.dtypes)
    print("\nMissing Values per Column:")
    print(df.isnull().sum())
    print("\nSummary Statistics:")
    print(df.describe(include='all'))
    print("\n" + "="*50 + "\n")

def clean_data(df):
    print("Cleaning Data...")
    
    # 1. Remove exact duplicates
    initial_rows = len(df)
    df = df.drop_duplicates()
    print(f"Removed {initial_rows - len(df)} duplicate rows.")
    
    # 2. Handle Missing Values
    # For numeric columns, fill with median or 0
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if df[col].isnull().any():
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)
            print(f"Filled missing values in {col} with median ({median_val})")
            
    # For categorical columns, fill with 'Unknown' or mode
    categorical_cols = df.select_dtypes(include=['object']).columns
    for col in categorical_cols:
        if df[col].isnull().any():
            mode_val = df[col].mode()[0]
            df[col] = df[col].fillna(mode_val)
            print(f"Filled missing values in {col} with mode ({mode_val})")
            
    return df

def preprocess_data(df):
    print("Preprocessing Data...")
    
    # 1. Standardize Boolean columns (if strings like 'True'/'False')
    bool_cols = ['is_rewards_member', 'order_ahead']
    for col in bool_cols:
        if col in df.columns:
            df[col] = df[col].map({'True': True, 'False': False, True: True, False: False, 'true': True, 'false': False})
            
    # 2. Feature Engineering: Extraction from order_time
    if 'order_time' in df.columns:
        # Convert HH:MM to hour
        df['order_hour'] = df['order_time'].str.split(':').str[0].astype(float)
        
        # Categorize Time Slots (Morning, Afternoon, Evening, Night)
        def get_time_slot(hour):
            if 5 <= hour < 12: return 'Morning'
            if 12 <= hour < 17: return 'Afternoon'
            if 17 <= hour < 21: return 'Evening'
            return 'Night'
        
        df['time_slot'] = df['order_hour'].apply(get_time_slot)
        print("Feature Engineered: 'order_hour' and 'time_slot'")
        
    return df

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found.")
        return

    # Load Data
    print(f"Loading data from {INPUT_FILE}...")
    df = pd.read_csv(INPUT_FILE)

    # 1. Initial EDA
    perform_eda(df)

    # 2. Cleaning
    df_cleaned = clean_data(df)

    # 3. Preprocessing
    df_processed = preprocess_data(df_cleaned)

    # 4. Final EDA on cleaned data
    print("\nFINAL CLEANED DATA INFO:")
    print(df_processed.info())

    # 5. Export
    print(f"\nSaving cleaned and preprocessed data to {OUTPUT_FILE}...")
    df_processed.to_csv(OUTPUT_FILE, index=False)
    print("Preprocessing complete!")

if __name__ == "__main__":
    main()
