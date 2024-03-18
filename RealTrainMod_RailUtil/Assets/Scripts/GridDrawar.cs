using System.Collections.Generic;
using UnityEngine;

public class GridDrawar : MonoBehaviour
{
    public GameObject cubePrefab; // Inspector���� �Ҵ�
    public int rows = 5; // Ȧ��
    public int cols = 5; // Ȧ��
    public float cubeSize = 1.0f; // ť���� ũ��

    // ����� ���� ����
    public Color colorOne = Color.black;
    public Color colorTwo = Color.white;

    void Start()
    {
        GenerateGrid();
    }

    void GenerateGrid()
    {
        if (rows % 2 == 0 || cols % 2 == 0)
        {
            Debug.LogError("Rows and Cols must be odd numbers.");
            return;
        }

        // �׸����� �߾��� (0, 0, 0)���� ����
        float offsetX = (cols - 1) * cubeSize / 2;
        float offsetZ = (rows - 1) * cubeSize / 2;

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                // �� ���� ��ġ ��� (���߾ӿ� ���߱� ���� .5�� ����)
                Vector3 position = new Vector3(j * cubeSize - offsetX + 0.5f, 0, i * cubeSize - offsetZ + 0.5f);
                // �������� ����Ͽ� �� ����
                GameObject cube = Instantiate(cubePrefab, position, Quaternion.identity);
                cube.transform.parent = this.transform; // ������ ť�긦 GridGenerator ������Ʈ�� �ڽ����� ����

                // ��� �̸� ����
                cube.name = $"{j - cols / 2}_{i - rows / 2}";

                // MeshRenderer�� �����ͼ� ���� ����
                MeshRenderer renderer = cube.GetComponent<MeshRenderer>();
                if (renderer != null)
                {
                    // ������ ������ ���� ����
                    renderer.material.color = (i + j) % 2 == 0 ? colorOne : colorTwo;
                }
            }
        }
    }
}
