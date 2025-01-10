---
title: Calculator Page Generator
hide:
    - toc
---

## Usage

* Change the values in example and run the code block to get scaffolding for calculator.
* Add calculation logic and publish.

??? example
    Say we wanted to create a Mile to Km calculator, then under `#Example Usage` change as follows:
    
    * title = "Miles to KM Converter"
    * field_labels = ["Miles"]
    * Run the code and then add conversion logic to the function: 
    
      ```
      // Initialise Variables
        let miles_val = values[0];
      
      // Write calculation logic
        let kilometer_val = 1.6 * miles_val; 

      // Display results
        const result = `${miles_val} miles is <strong>${kilometer_val} KM</strong>`;
      ```

<!-- PyScript CSS -->
<link rel="stylesheet" href="https://pyscript.net/releases/2024.11.1/core.css">
<!-- This script tag bootstraps PyScript -->
<script type="module" src="https://pyscript.net/releases/2024.11.1/core.js"></script>
<script type="py-editor">
    def generate_calculator_code(title, field_labels):
        # Start building the code
        code = f"""---
    title: {title}
    hide:
        - toc
    ---
    &lt;script&gt;
        function calculate() {{
            // Get user input values
            let values = [];
            for (let i = 0; i < {len(field_labels)}; i++) {{
                let value = parseFloat(document.getElementById("field" + (i + 1)).value);
                values.push(value);
            }}
            
            // Check if any fields are empty
            for (let value of values) {{
                if (!value) {{
                    document.getElementById("result").innerHTML = "<strong style='color: red;'>Please fill in all fields.</strong>";
                    return; // Exit the function if validation fails
                }}
            }}

            // Initialise Variables
            
            // Write calculation logic

            // Display results
            const result = `HTML to display the result`;
            document.getElementById("result").innerHTML = result;
        }}
    &lt;/script&gt;

    ## {title}

    <div class="grid cards" markdown>
    """

        # Generate input fields based on the provided labels
        for i, label in enumerate(field_labels):
            code += f"""
    -   <strong> {label} </strong> 
    
        --- 
    
        <input class="md-input" type="number" id="field{i + 1}" required>
    """
            if ((i+1) % 2)==0 and i+1<len(field_labels):
                code+="""
    </div>
    <div class="grid cards" markdown>
    """

        code += """
    </div>

    <p align="center"><a class="md-button" onclick="calculate()">Calculate <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v4h10V4zm0 6v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path></svg></span></a></p>

    <p id="result"></p>
    """

        return code

    # Example usage
    title = "Calculator Label"
    field_labels = ["Field 1", "Field 2", "Field 3", "Field 4","Field 5"]  # You can add more fields here

    generated_code = generate_calculator_code(title, field_labels)
    result = generated_code.replace('&lt;','<').replace('&gt;','>')
    from pyscript import display
    display(result, target="pyscriptresult_code", append=False)
</script>

<pre id="pyscriptresult"><span></span><button class="md-clipboard md-icon" title="Copy to clipboard" data-clipboard-target="#pyscriptresult > code"></button><code id = "pyscriptresult_code" class="md-code__content"></code></pre>