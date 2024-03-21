using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class RailCreateManager : Singleton<RailCreateManager>
{
    public bool railCreateMode;

    [Header("ÁÂÇ¥ ÀÌµ¿ UI")]
    public TMP_InputField xInput;
    public TMP_InputField zInput;

    public GameObject currentPointCube;

    public void MoveCoord()
    {
        float x = ParseInput(xInput.text + ".5");
        float z = ParseInput(zInput.text+ ".5");

        Vector3 vec = ConvertMinecraftToUnityCoords(x, 10, z);

        Camera.main.transform.position = vec;
    }

    private float ParseInput(string input)
    {
        return string.IsNullOrEmpty(input) ? 0f : float.Parse(input);
    }

    Vector3 ConvertMinecraftToUnityCoords(float x, float y, float z)
    {
        //Minecraft Coordinates to Unity Coords
        return new Vector3(x, y, -z);
    }

    

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.F3))
        {
            railCreateMode = !railCreateMode;
            currentPointCube.SetActive(railCreateMode);
        }
    }
}
