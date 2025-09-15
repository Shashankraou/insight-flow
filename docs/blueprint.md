# **App Name**: InsightFlow

## Core Features:

- Data Ingestion and Processing: Real-time ingestion and preprocessing of sensor data from the AI4I-2020 dataset using Pandas and NumPy.
- Predictive Model Training: Training a machine learning model (e.g., Random Forest) using Scikit-learn to predict equipment failure or estimate Remaining Useful Life (RUL) based on sensor data patterns.
- Health Status Visualization: Interactive dashboard using Streamlit and Plotly to display the health status of each machine, including risk scores and sensor readings.
- Failure Root Cause Analysis: Use a generative AI tool to examine feature importance metrics and suggest the probable cause of the imminent equipment failure
- Historical Analysis Tool: Tool that reviews the prediction record of the currently configured prediction algorithm. If insufficient data is available to evaluate it with acceptable statistical significance, the user is warned.
- T1-T8 Data Science Toolkit: Provides the basic infrastructure for conducting the statistical tests mentioned in the prompt

## Style Guidelines:

- Primary color: Deep teal (#008080) to reflect the precision of industrial processes.
- Background color: Light grey (#F0F0F0) for a clean and professional look.
- Accent color: Soft orange (#FFA07A) for actionable alerts and highlights.
- Body and headline font: 'Inter' (sans-serif) for a modern and readable dashboard interface.
- Use clear and concise icons to represent machine status and risk levels.
- Dashboard layout should be intuitive and provide a clear overview of machine health. Key metrics should be prominently displayed.
- Subtle animations to indicate real-time updates and status changes.