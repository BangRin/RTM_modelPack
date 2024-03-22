using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;

public class RailCreateManager : Singleton<RailCreateManager>
{
    public bool railCreateMode;

    [Header("��ǥ �̵� UI")]
    public TMP_InputField xInput;
    public TMP_InputField zInput;

    public GameObject currentPointCube;
    public Transform mousePosCube;

    float moveUnit = 1f; // �̵� ����
    float minX = -1500f; // X ��ǥ �ּҰ�
    float maxX = 1500f; // X ��ǥ �ִ밪
    float minZ = -1500f; // Z ��ǥ �ּҰ�
    float maxZ = 1500f; // Z ��ǥ �ִ밪

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

        if(railCreateMode)
        {
            if(Input.GetMouseButtonDown(0))
            {

            }
            Vector3 currentMousePosition = Camera.main.ScreenToWorldPoint(
                new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.y));

            int x, z;

            x = (int)currentMousePosition.x;
            z = (int)currentMousePosition.z;

            currentMousePosition.x = x;
            currentMousePosition.z = z;

            // ������ ��� 0.5�� ���ϰ�, ����� ��� 0.5�� ����
            currentMousePosition.x = ParseInput(x.ToString() + ".5");
            currentMousePosition.z = ParseInput(z.ToString() + ".5");

            mousePosCube.position = new Vector3(currentMousePosition.x, mousePosCube.position.y, currentMousePosition.z);
            //Debug.Log(currentMousePosition);
        }
    }
}
