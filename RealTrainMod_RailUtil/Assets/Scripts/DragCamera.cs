using UnityEngine;

public class DragCamera : MonoBehaviour
{
    public float dragSpeed = 1;
    public Vector3 dragOrigin;

    void Update()
    {
        // 마우스 왼쪽 버튼을 누르면
        if (Input.GetMouseButtonDown(0))
        {
            dragOrigin = Input.mousePosition; // 드래그 시작 위치 저장
            return;
        }

        // 마우스 왼쪽 버튼을 누른 채로 이동 중이면
        if (!Input.GetMouseButton(0)) return;

        // 현재 마우스 위치와 드래그 시작 위치의 차이를 계산하여 이동량 결정
        Vector3 difference = Input.mousePosition - dragOrigin;

        // 이동 방향 결정
        Vector3 moveDirection = new Vector3(-difference.x, -difference.y, 0).normalized;

        // 카메라 이동(이동 방향과 속도를 곱하여 이동량 결정)
        Vector3 move = moveDirection * dragSpeed * Time.deltaTime;
        transform.Translate(move, Space.World);

        // Y축 위치 고정
        Vector3 currentPosition = transform.position;
        currentPosition.y = 10; // Y축을 0으로 설정
        transform.position = currentPosition;

        // 현재 마우스 위치를 드래그 시작 위치로 업데이트
        dragOrigin = Input.mousePosition;
    }
}
