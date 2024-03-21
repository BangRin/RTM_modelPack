using UnityEngine;

public class DragCamera : MonoBehaviour
{
    private Vector3 dragOrigin;
    private bool isDragging = false;
    public float zoomSpeed = 4f; // ���콺 �� �� �ӵ� ����
    public float minFOV = 15f; // �ּ� FOV ��
    public float maxFOV = 130f; // �ִ� FOV ��

    void Update()
    {
        if (RailCreateManager.Instance.railCreateMode.Equals(true)) return;
        // ���콺 �� �Է����� FOV ����
        float scroll = Input.GetAxis("Mouse ScrollWheel");
        Camera.main.fieldOfView -= scroll * zoomSpeed;
        Camera.main.fieldOfView = Mathf.Clamp(Camera.main.fieldOfView, minFOV, maxFOV);

        // ���콺 �巡�׷� ī�޶� �̵� ����
        if (Input.GetMouseButtonDown(0))
        {
            isDragging = true;
            dragOrigin = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.y));
        }

        // ���콺 ��ư�� ���� �巡�� ����
        if (Input.GetMouseButtonUp(0))
        {
            isDragging = false;
        }

        // �巡�� �� ī�޶� �̵�
        if (isDragging)
        {
            Vector3 currentMousePosition = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.y));
            Vector3 moveDirection = dragOrigin - currentMousePosition;
            transform.position += moveDirection;
        }

    }
}
