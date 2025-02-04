public class StepData
{
    public int[] DataArray  { get; set; }
    public string[] Logs { get; set; }
    public int[] Highlight { get; set; }

    public StepData()
    {
        this.DataArray  = Array.Empty<int>();  // ✅ Refers to the instance property
        this.Logs = Array.Empty<string>(); 
        this.Highlight = this.DataArray;  // ✅ Refers to the instance property, not System.Array
    }
}
